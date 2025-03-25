const express = require('express');

const server = express();
server.use(express.json());

const cursos = ['NodeJS', 'JavaScript', 'React Native'];

server.use((req, res, next) => {
	console.log(`Url chamada: ${req.url}`);
	return next();
});

function nameValidation(req, res, next) {
	if (!req.body.name) {
		return res.status(422).json({ error: 'O nome do curso é obrigatório' });
	}
	return next();
}

function checkId(req, res, next) {
	if (!cursos[req.params.id]) {
		return res.status(404).json({ error: 'O curso informado não existe' });
	}
	return next();
}

server.get('/ping', (req, res) => {
	return res.json({ msg: 'pong' });
});

server.get('/cursos/:id', checkId, (req, res) => {
	const { id } = req.params;
	return res.json(cursos[id]);
});

server.get('/cursos', (req, res) => {
	return res.json(cursos);
});

server.post('/cursos', nameValidation, (req, res) => {
	const { name } = req.body;
	cursos.push(name);
	return res.json({
		msg: 'Curso adicionado com sucesso',
		cursos,
		id: cursos.length - 1,
	});
});

server.put('/cursos/:id', checkId, nameValidation, (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	cursos[id] = name;
	return res.json({ msg: 'Curso atualizado com sucesso', cursos });
});

server.delete('/cursos/:id', checkId, (req, res) => {
	const { id } = req.params;
	cursos.splice(id, 1);
	return res.json({ msg: 'Curso excluído com sucesso', cursos });
});

server.listen(3000);
