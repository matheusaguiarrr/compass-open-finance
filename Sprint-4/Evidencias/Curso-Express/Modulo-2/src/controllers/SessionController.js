import User from '../models/User.js';

class SessionController {
	async store(req, res) {
		const { email } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			user = await User.create({ email: email });
			return res.json({ message: 'Usuário criado com sucesso', user });
		}
		return res.json({ user });
	}
}

export default new SessionController();
