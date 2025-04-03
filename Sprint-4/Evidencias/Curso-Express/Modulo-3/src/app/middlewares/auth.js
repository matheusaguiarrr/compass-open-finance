import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { jwtConfig } from './../../config/auth.js';

export default async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ error: 'Token não informado' });
	const [, token] = authHeader.split(' ');
	try {
		const decoded = await promisify(jwt.verify)(token, jwtConfig.secrete);
		req.userId = decoded.id;
		return next();
	} catch (error) {
		return res.status(401).json({ error });
	}
};
