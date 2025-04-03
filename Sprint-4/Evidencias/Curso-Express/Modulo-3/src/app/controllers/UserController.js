import User from './../models/User.js';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro na validação' });
		}
		const userExists = await User.findOne({
			where: { email: req.body.email },
		});
		if (userExists) {
			return res.status(422).json({ error: 'Usuário já existe' });
		}
		const user = await User.create(req.body);
		return res.json({ user });
	}

	async show(req, res) {
		const user = await User.findByPk(req.userId);
		if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
		return res.json({ user });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(6),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field,
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field,
			),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro na validação' });
		}
		const { email, oldPassword } = req.body;
		const user = await User.findByPk(req.userId);
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
		if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
			return res.status(401).json({ error: 'Senha incorreta' });
		}
		const { id, name } = await user.update(req.body);
		return res.json({
			user: {
				id,
				name,
				email,
			},
		});
	}

	async destroy(req, res) {
		const user = await User.findByPk(req.userId);
		if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
		await user.destroy();
		return res.json({ message: 'Usuário excluído com sucesso' });
	}
}

export default new UserController();
