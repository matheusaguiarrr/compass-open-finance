import Sequelize from 'sequelize';
import databaseConfig from './../config/database.js';
import User from './../app/models/User.js';
import Task from './../app/models/Task.js';

const models = [User, Task];

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
