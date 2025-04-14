import { DataTypes, Model } from 'sequelize';

class Transaction extends Model {
	static init(sequelize) {
		return super.init(
			{
				account_id: {
					type: DataTypes.INTEGER,
					references: { model: 'account', key: 'id' },
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
					allowNull: false,
				},
				value: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
					defaultValue: 0.0,
				},
				type: {
					type: DataTypes.ENUM('credit', 'debit'),
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'transactions',
			},
		);
	}
	static associate(models) {
		this.belongsTo(models.Account, {
			foreignKey: 'account_id',
			as: 'account',
		});
	}
}

export default Transaction;
