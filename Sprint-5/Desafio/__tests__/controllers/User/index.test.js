import { jest } from '@jest/globals';

const userMockFindAll = jest.fn();
await jest.unstable_mockModule('../../../src/app/models/User.js', () => ({
	default: {
		findAll: userMockFindAll,
	},
}));
const UserController = (await import('../../../src/app/controllers/UserController.js'))
	.default;

describe('UserController - Index', () => {
	it('deve retornar uma lista de usuários', async () => {
		const mockUsers = [
			{ id: 1, name: 'Matheus', email: 'matheus@email.com', cpf: '123.456.789-00' },
		];
		userMockFindAll.mockResolvedValue(mockUsers);
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.index(req, res);
		expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
	});

	it('deve retornar erro 404 se não houver usuários', async () => {
		userMockFindAll.mockResolvedValue([]);
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.index(req, res);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: 'Não há usuários cadastrados' });
	});

	it('deve retornar erro 500 se ocorrer um erro no banco', async () => {
		userMockFindAll.mockRejectedValue(new Error('DB error'));
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.index(req, res);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: 'Erro ao listar todos os usuário',
			details: 'DB error',
		});
	});
});
