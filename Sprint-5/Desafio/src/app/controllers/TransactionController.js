import normalizeText from 'normalize-text';
import * as Yup from 'yup';

import Account from '../models/Account.js';
import Institution from '../models/Institution.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

class TransactionController {
	async index(req, res) {
		try {
			const { id } = req.params;
			const { institution } = req.query;
			let dataInstitution = null;
			const user = await User.findByPk(id);
			if (user === null) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
			if (institution !== undefined) {
				const normalizedInstitution = normalizeText(institution);
				dataInstitution = await Institution.findOne({
					where: { normalized_name: normalizedInstitution },
				});
				if (dataInstitution === null) {
					return res.status(404).json({ error: 'Instituição não encontrada' });
				}
			}
			let transactions = null;
			if (!institution) {
				transactions = await Transaction.findAll({
					include: {
						model: Account,
						as: 'account',
						where: { user_id: id },
					},
				});
			} else {
				transactions = await Transaction.findAll({
					include: {
						model: Account,
						as: 'account',
						where: { user_id: id, institution_id: dataInstitution.id },
					},
				});
			}
			if (transactions.length === 0) {
				return res
					.status(404)
					.json({ error: 'Não há transações para o usuário informado' });
			}
			return res.json({ transactions });
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}

	async store(req, res) {
		try {
			const schema = Yup.object().shape({
				institution_id: Yup.number()
					.typeError('Por favor, informe um id válido.')
					.required('O campo instituição é obrigatório.'),
				value: Yup.number()
					.min(0.01, 'O valor não pode ser negativo')
					.required('O campo valor é obrigatório'),
				type: Yup.string()
					.oneOf(
						['credit', 'debit'],
						'Tipo inválido. As opções válidas são credit ou debit.',
					)
					.required('O campo tipo é obrigatório'),
			});
			await schema.validate(req.body, { abortEarly: false, strict: true });
			const { id } = req.params;
			const { institution_id, value, type } = req.body;
			const account = await Account.findOne({
				where: {
					user_id: id,
					institution_id,
				},
			});
			if (account === null) {
				return res.status(404).json({
					error: 'Conta não encontrada para o usuário e instituição informados',
				});
			}
			if (type === 'debit' && account.balance < value) {
				return res
					.status(422)
					.json({ error: 'Saldo insuficiente para realizar a transação' });
			}
			const transaction = await Transaction.create({
				account_id: account.id,
				value,
				type,
			});
			const parsedBalance = parseFloat(account.balance);
			const parsedValue = parseFloat(value);
			const newBalance =
				type === 'credit'
					? parseFloat((parsedBalance + parsedValue).toFixed(2))
					: parseFloat((parsedBalance - parsedValue).toFixed(2));
			await account.update({ balance: newBalance });
			return res.status(201).json({
				message: 'Transação realizada com sucesso',
				transaction,
				new_balance: newBalance,
			});
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				return res.status(422).json({
					error: 'Erro na validação',
					messages: error.inner.map((error) => ({
						field: error.path,
						message: error.message,
					})),
				});
			}
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}
}

export default new TransactionController();
