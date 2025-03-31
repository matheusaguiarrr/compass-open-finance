import House from './../models/House.js';
import User from './../models/User.js';
import * as Yup from 'yup';

class HouseController {
	async index(req, res) {
		const { status } = req.query;
		const houses = await House.find({ status });
		if (houses.length === 0) {
			return res
				.status(404)
				.json({ message: `Não há casas com o status ${status}` });
		}
		return res.json({ houses });
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			description: Yup.string().required(),
			price: Yup.number().required(),
			location: Yup.string().required(),
			status: Yup.boolean().required(),
		});
		const { user_id } = req.headers;
		const { filename } = req.file;
		const { description, price, location, status } = req.body;
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro de validação' });
		}
		const house = await House.create({
			user: user_id,
			thumbnail: filename,
			description,
			price,
			location,
			status,
		});
		return res.json({ message: 'Casa criada com sucesso', house });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			description: Yup.string().required(),
			price: Yup.number().required(),
			location: Yup.string().required(),
			status: Yup.boolean().required(),
		});
		const { id } = req.params;
		const { filename } = req.file;
		const { user_id } = req.headers;
		const { description, price, location, status } = req.body;
		const user = await User.findById(user_id);
		const house = await House.findById(id);
		if (String(user._id) !== String(house.user)) {
			return res.status(401).json({ error: 'Não autorizado' });
		}
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Erro de validação' });
		}
		await House.updateOne(
			{ _id: id },
			{
				user: user_id,
				thumbnail: filename,
				description,
				price,
				location,
				status,
			},
		);
		return res.json({ message: 'Casa atualizada com sucesso' });
	}

	async destroy(req, res) {
		const { id } = req.params;
		const { user_id } = req.headers;
		const user = await User.findById(user_id);
		const house = await House.findById(id);
		if (String(user._id) !== String(house.user)) {
			return res.status(401).json({ error: 'Não autorizado' });
		}
		await House.deleteOne({ _id: id });
		return res.json({ message: 'Casa deletada com sucesso' });
	}
}

export default new HouseController();
