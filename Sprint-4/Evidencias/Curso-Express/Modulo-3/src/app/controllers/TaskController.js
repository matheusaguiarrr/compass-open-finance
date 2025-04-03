import * as Yup from 'yup';
import Task from './../models/Task.js';

class TaskController {
	async index(req, res) {
		const tasks = await Task.findAll({
			where: { user_id: req.userId, check: false },
		});
		return res.json({ tasks });
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			task: Yup.string().required(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(422).json({ error: 'Falha na validação' });
		}
		const { task } = req.body;
		const tasks = await Task.create({ task: task, user_id: req.userId });
		return res.json({ tasks });
	}

	async update(req, res) {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
		await task.update({ check: true });
		return res.json({ message: 'Tarefa concluída com sucesso!', task });
	}

	async destroy(req, res) {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
		if (task.user_id !== req.userId) {
			return res.status(401).json({ error: 'Usuário não autorizado' });
		}
		await task.destroy();
		return res.json({ message: 'Tarefa excluída com sucesso!' });
	}
}

export default new TaskController();
