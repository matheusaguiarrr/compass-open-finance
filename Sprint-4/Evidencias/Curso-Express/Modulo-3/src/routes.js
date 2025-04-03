import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import authMiddleware from './app/middlewares/auth.js';
import TaskController from './app/controllers/TaskController.js';

export const routes = new Router();

routes.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
// Apartir daqui todas as rotas precisam do token
routes.use(authMiddleware);
routes.get('/users', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.destroy);
