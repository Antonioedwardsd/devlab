import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

interface TaskAttributes {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	status: "pending" | "in-progress" | "completed";
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task
	extends Model<TaskAttributes, TaskCreationAttributes>
	implements TaskAttributes
{
	public id!: string;
	public title!: string;
	public description?: string;
	public completed!: boolean;
	public status!: "pending" | "in-progress" | "completed";

	// Propiedades automáticas de Sequelize
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Task.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: true,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		status: {
			type: DataTypes.ENUM("pending", "in-progress", "completed"),
			allowNull: false,
			defaultValue: "pending",
		},
	},
	{
		sequelize,
		modelName: "Task",
		tableName: "tasks",
		timestamps: true,
	}
);

export default Task;
