import { Router } from 'express';

import AccountController from './app/controllers/AccountController.js';
import InstitutionController from './app/controllers/InstitutionController.js';
import TransactionController from './app/controllers/TransactionController.js';
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

routes.get('/users/:id/accounts', AccountController.index);
routes.post('/users/:id/accounts', AccountController.store);
routes.get('/users/:id/accounts/:accountId', AccountController.show);
routes.delete('/users/:id/accounts/:accountId', AccountController.destroy);

routes.post('/users/:id/transactions', TransactionController.store);

routes.get('/users/:id/extract', TransactionController.index);
