import { Router } from 'express';

export const routes = new Router();

routes.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});
