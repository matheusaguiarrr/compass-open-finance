import dotenv from 'dotenv';

dotenv.config();

export default {
	dialect: 'postgres',
	host: process.env.POSTGRES_USER ? process.env.POSTGRES_HOST : 'localhost',
	port: process.env.POSTGRES_PORT || 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
