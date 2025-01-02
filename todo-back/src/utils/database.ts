import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTestEnv = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
	process.env.DB_NAME || (isTestEnv ? "test_todo" : "todo_back"),
	process.env.DB_USER || "postgres",
	process.env.DB_PASSWORD || "root",
	{
		host: process.env.DB_HOST || "localhost",
		port: parseInt(process.env.DB_PORT || "5432"),
		dialect: "postgres",
		logging: !isTestEnv, // Desactivar logging en pruebas
	}
);

export default sequelize;
