import { Op } from 'sequelize';
import * as Yup from 'yup';

import User from './../models/User.js';

class UserController {
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
				name: Yup.string().required('O campo Nome é obrigatório.'),
				email: Yup.string()
					.email('O campo Email deve conter um endereço válido.')
					.required('O campo Email é obrigatório.'),
			});
			try {
				await schema.validate(req.body, { abortEarly: false });
			} catch (err) {
				return res.status(422).json({
					error: 'Erro na validação',
					messages: err.inner.map((e) => ({
						field: e.path,
						message: e.message,
					})),
				});
			}
			let { cpf, name, email } = req.body;
			cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
			const userExists = await User.findOne({
				where: {
					[Op.or]: [{ email }, { cpf }],
				},
			});
			if (userExists) {
				return res.status(422).json({ error: 'Usuário já existe' });
			}
			const user = await User.create({ cpf, name, email });
			return res.json({ user });
		} catch (error) {
			return res.status(500).json({
				error: 'Erro ao criar usuário',
				details: error.message,
			});
		}
	}

	async show(req, res) {
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
		return res.json({ user });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro na validação' });
		}
		const { email } = req.body;
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
		if (email && email !== user.email) {
			const userExists = await User.findOne({
				where: { email: req.body.email },
			});
			if (userExists) {
				return res
					.status(422)
					.json({ error: 'Já existe um usuário com esse email' });
			}
		}
		const { id, name } = await user.update(req.body);
		return res.json({
			message: 'Usuário atualizado com sucesso',
			user: {
				id,
				name,
				email,
			},
		});
	}
}

export default new UserController();
