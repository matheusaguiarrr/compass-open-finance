import { jest } from '@jest/globals';

const userMockFindByPk = jest.fn();
await jest.unstable_mockModule('../../../src/app/models/User.js', () => ({
	default: {
		findByPk: userMockFindByPk,
	},
}));
const UserController = (await import('../../../src/app/controllers/UserController.js'))
	.default;

describe('UserController - Show', () => {
	it('deve retornar um usuário', async () => {
		const mockUser = {
			id: 1,
			name: 'Matheus',
			email: 'matheus@email.com',
			cpf: '123.456.789-00',
		};
		userMockFindByPk.mockResolvedValue(mockUser);
		const req = { params: { id: 1 } };
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.show(req, res);
		expect(res.json).toHaveBeenCalledWith({ user: mockUser });
	});

	it('deve retornar erro 404 se não encontrar o usuário', async () => {
		userMockFindByPk.mockResolvedValue();
		const req = { params: { id: 1 } };
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.show(req, res);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
	});

	it('deve retornar erro 500 se ocorrer um erro no banco', async () => {
		userMockFindByPk.mockRejectedValue(new Error('DB error'));
		const req = { params: { id: 1 } };
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await UserController.show(req, res);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: 'Erro ao listar usuário',
			details: 'DB error',
		});
	});
});
