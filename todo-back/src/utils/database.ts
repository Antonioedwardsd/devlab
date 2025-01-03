import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTestEnv = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
	dialect: isTestEnv ? "sqlite" : "postgres",
	storage: isTestEnv ? ":memory:" : undefined,
	database: isTestEnv
		? undefined
		: process.env.DB_NAME || (isTestEnv ? "test_todo" : "todo_back"),
	username: isTestEnv ? undefined : process.env.DB_USER || "postgres",
	password: isTestEnv ? undefined : process.env.DB_PASSWORD || "root",
	host: isTestEnv ? undefined : process.env.DB_HOST || "localhost",
	port: isTestEnv ? undefined : parseInt(process.env.DB_PORT || "5432"),
	logging: false,
});

export default sequelize;
