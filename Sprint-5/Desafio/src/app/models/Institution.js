import { DataTypes, Model } from 'sequelize';

class Institution extends Model {
	static init(sequelize) {
		super.init(
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
}

export default Institution;
