import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload.js';

import SessionController from './controllers/SessionController.js';
import HouseController from './controllers/HouseController.js';
import DashboardController from './controllers/DashboardController.js';
import ReserveController from './controllers/ReserveController.js';

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/ping', (req, res) => {
	return res.json({ msg: 'pong' });
});
routes.post('/sessions', SessionController.store);

routes.get('/houses', HouseController.index);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses/:id', HouseController.destroy);

routes.get('/dashboard/:user', DashboardController.show);

routes.get('/houses/reserves', ReserveController.index);
routes.post('/houses/:house/reserves', ReserveController.store);
routes.delete('/reserves/:id', ReserveController.destroy);

export default routes;
