import { Router } from 'express';

import UserController from './app/controllers/UserController.js';

export const routes = new Router();

routes.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
