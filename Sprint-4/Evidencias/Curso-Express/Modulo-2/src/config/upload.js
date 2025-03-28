import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'storage'),
		filename: (req, file, callback) => {
			const extension = path.extname(file?.originalname);
			const name = path.basename(req.headers?.user_id, extension);
			callback(null, `${name}-${Date.now()}${extension}`);
		},
	}),
};
