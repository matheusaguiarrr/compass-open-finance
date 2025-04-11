import { DataTypes, Model } from 'sequelize';

class Account extends Model {
	static init(sequelize) {
		return super.init(
			{
				user_id: {
					type: DataTypes.INTEGER,
					references: { model: 'users', key: 'id' },
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
					allowNull: false,
				},
				institution_id: {
					type: DataTypes.INTEGER,
					references: { model: 'institutions', key: 'id' },
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
					allowNull: false,
				},
				balance: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
					defaultValue: 0.0,
				},
			},
			{
				sequelize,
				tableName: 'accounts',
			},
		);
	}
	static associate(models) {
		this.belongsTo(models.Institution, {
			foreignKey: 'institution_id',
			as: 'institution',
		});
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		});
	}
}

export default Account;
