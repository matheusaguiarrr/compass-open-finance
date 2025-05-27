import dotenv from 'dotenv';

dotenv.config();

export default {
	dialect: 'postgres',
	host: 'localhost',
	port: 5468,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
