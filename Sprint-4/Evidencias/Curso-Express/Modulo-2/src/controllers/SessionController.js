import User from '../models/User.js';
import * as Yup from 'yup';

class SessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
		});
		const { email } = req.body;
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro de validação' });
		}
		let user = await User.findOne({ email });
		if (!user) {
			user = await User.create({ email: email });
			return res.json({ message: 'Usuário criado com sucesso', user });
		}
		return res.json({ user });
	}
}

export default new SessionController();
