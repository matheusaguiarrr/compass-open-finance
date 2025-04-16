import normalizeText from 'normalize-text';
import * as Yup from 'yup';

import Account from '../models/Account.js';
import Institution from '../models/Institution.js';
import User from '../models/User.js';

class AccountController {
	async index(req, res) {
		try {
			const accounts = await Account.findAll({
				where: { user_id: req.params.id },
				include: [
					{
						model: Institution,
						as: 'institution',
						attributes: ['id', 'name'],
					},
					{
						model: User,
						as: 'user',
						attributes: ['id', 'name', 'email'],
					},
				],
			});
			if (accounts.length === 0) {
				return res.status(404).json({
					error: 'Não há contas cadastradas para o usuário informado.',
				});
			}
			return res.json({ accounts });
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
				balance: Yup.number()
					.typeError('Por favor, informe um valor válido.')
					.min(0, 'O saldo não pode ser negativo'),
			});
			await schema.validate(req.body, { abortEarly: false, strict: true });
			const { id } = req.params;
			const institutionId = req.body.institution_id;
			const user = await User.findByPk(id);
			if (user === null) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
			const institution = await Institution.findByPk(institutionId);
			if (institution === null) {
				return res.status(404).json({ error: 'Instituição não encontrada' });
			}
			const accountExists = await Account.findOne({
				where: { user_id: id, institution_id: institutionId },
			});
			if (accountExists) {
				return res.status(422).json({
					error: 'O usuário já possui uma conta na instituição informada',
				});
			}
			const account = await Account.create({
				user_id: id,
				...req.body,
			});
			return res.status(201).json({ account });
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

	async show(req, res) {
		try {
			const account = await Account.findByPk(req.params.accountId, {
				include: [
					{
						model: Institution,
						as: 'institution',
						attributes: ['id', 'name'],
					},
					{
						model: User,
						as: 'user',
						attributes: ['id', 'name', 'email'],
					},
				],
			});
			if (account === null) {
				return res.status(404).json({ error: 'Conta não encontrada' });
			}
			return res.json({ account });
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}

	async destroy(req, res) {
		try {
			const account = await Account.findByPk(req.params.accountId);
			if (account === null) {
				return res.status(404).json({ error: 'Conta não encontrada' });
			}
			await account.destroy();
			return res.sendStatus(204);
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}

	async showBalance(req, res) {
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
			let totalBalance = 0;
			if (!institution) {
				const accounts = await Account.findAll({
					where: {
						user_id: id,
					},
				});
				if (accounts.length === 0) {
					return res
						.status(404)
						.json({
							error: 'O usuário informado não possui contas cadastradas',
						});
				}
				totalBalance = accounts
					.reduce(
						(prev, account) => parseFloat(prev) + parseFloat(account.balance),
						0,
					)
					.toFixed(2);
			} else {
				const account = await Account.findOne({
					where: {
						user_id: id,
						institution_id: dataInstitution.id,
					},
				});
				if (account === null) {
					return res
						.status(404)
						.json({
							error: 'O usuário informado não possui conta cadastrada na instituição informada',
						});
				}
				totalBalance = account.balance;
			}
			return res.json({ balance: parseFloat(totalBalance) });
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}
}

export default new AccountController();
