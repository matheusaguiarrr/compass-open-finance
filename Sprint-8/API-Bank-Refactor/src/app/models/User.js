import { DataTypes, Model } from 'sequelize';

class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				cpf: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
			},
			{
				sequelize,
				tableName: 'users',
			},
		);
	}

	static isValidCPF(cpf) {
		if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
		let sum = 0;
		let remainder;
		for (let i = 1; i <= 9; i++) {
			sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}
		remainder = (sum * 10) % 11;
		if (remainder === 10 || remainder === 11) remainder = 0;
		if (remainder !== parseInt(cpf.substring(9, 10))) return false;
		sum = 0;
		for (let i = 1; i <= 10; i++) {
			sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}
		remainder = (sum * 10) % 11;
		if (remainder === 10 || remainder === 11) remainder = 0;
		return remainder === parseInt(cpf.substring(10, 11));
	}

	static associate(models) {
		this.hasMany(models.Account, {
			foreignKey: 'user_id',
			as: 'accounts',
		});
	}
}

export default User;
