import normalizeText from 'normalize-text';
import * as Yup from 'yup';

import Institution from '../models/Institution.js';

class InstitutionController {
	async index(req, res) {
		try {
			const institutions = await Institution.findAll();
			if (institutions.length === 0) {
				return res.status(404).json({ error: 'Não há instituições cadastradas' });
			}
			return res.json({ institutions });
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
				name: Yup.string()
					.typeError('Por favor, informe um nome válido.')
					.required('O campo nome é obrigatório.')
					.matches(
						/^[A-Za-zÀ-ÿ\s]+$/,
						'O nome deve conter apenas letras e espaços.',
					),
			});
			await schema.validate(req.body, { abortEarly: false, strict: true });
			const { name } = req.body;
			const normalizedName = normalizeText(name);
			const institutionExists = await Institution.findOne({
				where: { normalized_name: normalizedName },
			});
			if (institutionExists) {
				return res
					.status(422)
					.json({ error: 'Já existe uma instituição com esse nome' });
			}
			const institution = await Institution.create({
				name,
				normalized_name: normalizedName,
			});
			return res.status(201).json({ institution });
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
			const institution = await Institution.findByPk(req.params.id);
			if (institution === null) {
				return res.status(404).json({ error: 'Instituição não encontrada' });
			}
			return res.json({ institution });
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}

	async update(req, res) {
		try {
			const schema = Yup.object().shape({
				name: Yup.string()
					.typeError('Por favor, informe um nome válido.')
					.required('O campo nome é obrigatório.')
					.matches(
						/^[A-Za-zÀ-ÿ\s]+$/,
						'O nome deve conter apenas letras e espaços.',
					),
			});
			await schema.validate(req.body, { abortEarly: false, strict: true });
			const institution = await Institution.findByPk(req.params.id);
			if (institution === null) {
				return res.status(404).json({ error: 'Instituição não encontrada' });
			}
			const { name } = req.body;
			const normalizedName = normalizeText(name);
			const institutionExists = await Institution.findOne({
				where: { normalized_name: normalizedName },
			});
			if (institutionExists && institutionExists.id !== institution.id) {
				return res
					.status(422)
					.json({ error: 'Já existe uma instituição com esse nome' });
			}
			await institution.update({
				name,
				normalized_name: normalizedName,
			});
			return res.json({
				message: 'Instituição atualizada com sucesso',
				institution,
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
				details: error.message,
			});
		}
	}

	async destroy(req, res) {
		try {
			const institution = await Institution.findByPk(req.params.id);
			if (institution === null) {
				return res.status(404).json({ error: 'Instituição não encontrada' });
			}
			await institution.destroy();
			return res.sendStatus(204);
		} catch (error) {
			return res.status(500).json({
				error: 'Erro interno do servidor',
				details: error.message,
			});
		}
	}
}

export default new InstitutionController();
