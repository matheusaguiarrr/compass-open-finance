import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import routes from './routes.js';
import { fileURLToPath } from 'url';

class App {
	constructor() {
		this.server = express();
		mongoose.connect('mongodb://localhost:27017/devhouse');
		this.middlewares();
	}

	middlewares() {
		// Qualquer dominio liberado
		this.server.use(cors());
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		this.server.use(
			'/storage',
			express.static(path.resolve(__dirname, '..', 'storage')),
		);
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}
}

export default new App().server;
