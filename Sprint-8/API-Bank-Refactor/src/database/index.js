import Sequelize from 'sequelize';

import Account from '../app/models/Account.js';
import Institution from '../app/models/Institution.js';
import Transaction from '../app/models/Transaction.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.js';
import OpenFinace from '../app/models/OpenFinance.js';

const models = [User, Institution, Account, Transaction, OpenFinace];

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
