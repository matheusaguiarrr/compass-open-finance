import Sequelize from 'sequelize';

import Institution from '../app/models/Institution.js';
import User from './../app/models/User.js';
import databaseConfig from './../config/database.js';

const models = [User, Institution];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			.forEach((model) => {
				if (model && typeof model.associate === 'function') {
					model.associate(this.connection.models);
				}
			});
	}
}

export default new Database();
