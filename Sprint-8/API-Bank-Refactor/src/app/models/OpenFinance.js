import { DataTypes, Model } from 'sequelize';

class OpenFinace extends Model {
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
				status: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},
				expiration_date: {
					type: DataTypes.DATE,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: 'openFinance',
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

export default OpenFinace;
