import House from '../models/House.js';
import Reserve from '../models/Reserve.js';
import User from '../models/User.js';

class ReserveController {
	async index(req, res) {
		const { user } = req.query;
		const reserves = await Reserve.find({ user }).populate({ path: 'house' });
		return res.json({ reserves });
	}

	async store(req, res) {
		const { house } = req.params;
		const { user, date } = req.body;
		const houseDb = await House.findOne({ _id: house });
		const userDb = await User.findOne({ _id: user });
		if (houseDb.length === 0) {
			return res.status(404).json({ error: 'Casa não encontrada' });
		}
		if (houseDb.status === false) {
			return res
				.status(422)
				.json({ error: 'A casa informada não está disponível' });
		}
		if (String(userDb._id) === String(houseDb.user)) {
			return res.status(401).json({ error: 'Reserva não permitida' });
		}
		const reserve = await Reserve.create({
			date,
			user,
			house,
		});
		await House.findOneAndUpdate({ _id: house }, { status: false });
		await reserve.populate([{ path: 'house' }, { path: 'user' }]);
		res.json({ message: 'Reserva feita com sucesso', reserve });
	}

	async destroy(req, res) {
		const { id } = req.params;
		const reserve = await Reserve.findByIdAndDelete({ _id: id });
		if (reserve === null) {
			return res.status(404).json({ error: 'Reserva não encontrada' });
		}
		return res.json({ message: 'Reserva excluída com sucesso' });
	}
}

export default new ReserveController();
