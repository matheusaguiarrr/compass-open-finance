import { DataTypes, Model } from 'sequelize';

class Institution extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				normalized_name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
			},
			{
				sequelize,
				tableName: 'institutions',
			},
		);
	}
	static associate(models) {
		this.hasMany(models.Account, {
			foreignKey: 'institution_id',
			as: 'accounts',
		});
	}
}

export default Institution;
