import { Model, DataTypes } from 'sequelize';

class Task extends Model {
	static init(sequelize) {
		super.init(
			{
				task: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				check: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},
				user_id: {
					type: DataTypes.INTEGER,
					references: { model: 'users', key: 'id' },
					onUpdate: 'CASCADE',
					onDelete: 'SET NULL',
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'tasks',
			},
		);
	}
	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	}
}

export default Task;
