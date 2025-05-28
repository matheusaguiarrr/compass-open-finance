import * as Yup from 'yup';

import Account from '../models/Account.js';
import Institution from '../models/Institution.js';
import User from '../models/User.js';
import OpenFinance from '../models/OpenFinance.js';

class OpenFinanceController {
	async store(req, res) {
		try {
			const schema = Yup.object().shape({
				cpf: Yup.string()
					.required('O campo CPF é obrigatório.')
					.max(
						11,
						'Por favor, digite somente os números sem pontuação. Exemplo: 00000000000',
					)
					.test(
						'valid-cpf',
						'CPF inválido. Verifique os números informados.',
						(value) => {
							if (!value) return false;
							const cpf = value.replace(/\D/g, '');
							return User.isValidCPF(cpf);
						},
					),
				expirationDate: Yup.date()
					.when('expiration', {
						is: true,
						then: (schema) =>
							schema.required('A data de expiração é obrigatória.'),
						otherwise: (schema) => schema.notRequired(),
					})
					.min(new Date(), 'A data de expiração deve ser futura.'),
				expiration: Yup.boolean()
					.required('O campo de expiração é obrigatório.')
					.oneOf(
						[true, false],
						'O campo de expiração deve ser verdadeiro ou falso.',
					),
				authorization: Yup.boolean()
					.required('O campo de autorização é obrigatório.')
					.oneOf(
						[true, false],
						'O campo de autorização deve ser verdadeiro ou falso.',
					),
			});
			const validatedData = await schema.validate(req.body, { abortEarly: false });
			let { cpf, expirationDate, expiration, authorization } = validatedData;
			cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
			const user = await User.findOne({
				where: { cpf },
				include: [
					{
						model: Account,
						as: 'accounts',
						include: [
							{
								model: Institution,
								as: 'institution',
							},
						],
					},
				],
			});
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
			if (!user?.accounts || user?.accounts?.length === 0) {
				return res.status(404).json({
					error: 'Usuário não possui contas cadastradas',
				});
			}
			const account = user.accounts[0];
			const existsOpenFinance = await OpenFinance.findOne({
				where: { account_id: account.id },
			});
			if (existsOpenFinance) {
				return res.status(422).json({
					error: 'Compartilhamento já existe para esta conta',
				});
			}
			const openFinance = await OpenFinance.create({
				account_id: account.id,
				status: authorization,
				expiration_date: expiration ? expirationDate : null,
			});
			return res.status(201).json({
				success: true,
				message: 'Compartilhamento feito com sucesso',
				data: {
					account: {
						institutionName: account.institution.name,
						id: openFinance.account_id,
						account: account.account,
						agency: account.agency,
					},
				},
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
				details: error?.message ? error?.message : error,
			});
		}
	}

	async show(req, res) {
		try {
			const { account, agency } = req.query;
			if (!account || !agency) {
				return res
					.status(400)
					.json({ error: 'A conta e agência são obrigatórios' });
			}
			const accountData = await Account.findOne({
				where: { account, agency },
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
			if (!accountData) {
				return res.status(404).json({ error: 'Conta não encontrada' });
			}
			const openFinanceData = await OpenFinance.findOne({
				where: { account_id: accountData.id },
				attributes: ['id', 'account_id', 'status', 'expiration_date'],
			});
			if (!openFinanceData) {
				return res.status(404).json({ error: 'Compartilhamento não encontrado' });
			}
			if (!openFinanceData.status) {
				return res.status(403).json({ error: 'Compartilhamento não autorizado' });
			}
			if (
				openFinanceData.expiration_date &&
				new Date() > new Date(openFinanceData.expiration_date)
			) {
				return res.status(403).json({ error: 'Compartilhamento expirado' });
			}
			return res.json({
				success: true,
				data: {
					balance: accountData.balance,
				},
			});
		} catch (error) {
			return res.status(500).json({
				error: 'Erro ao listar compartilhamento',
				details: error?.message ? error?.message : error,
			});
		}
	}
}

export default new OpenFinanceController();
