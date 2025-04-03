import User from './../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtConfig } from './../../config/auth.js';

class SessionController {
	async store(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: { email },
		});
		if (!user) {
			return res.status(422).json({ error: 'Usuário não existe' });
		}
		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(422).json({ error: 'Email ou senha incorretos' });
		}
		const { id, name } = user;
		return res.json({
			user: {
				id,
				name,
				email,
			},
			token: jwt.sign({ id }, jwtConfig.secrete, {
				expiresIn: jwtConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
