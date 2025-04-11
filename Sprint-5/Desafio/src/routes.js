import { Router } from 'express';

import InstitutionController from './app/controllers/InstitutionController.js';
import UserController from './app/controllers/UserController.js';

export const routes = new Router();

routes.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);

routes.get('/institutions', InstitutionController.index);
routes.post('/institutions', InstitutionController.store);
routes.get('/institutions/:id', InstitutionController.show);
routes.put('/institutions/:id', InstitutionController.update);
routes.delete('/institutions/:id', InstitutionController.destroy);
