import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
	path: process.env.NODE_ENV === "test" ? "./test.env" : "./.env",
});
import express from "express";
import sequelize from "./utils/database";
import Task from "./models/taskModel";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use(taskRoutes);
app.use(errorHandler);

const configureAuth = (app: express.Application) => {
	if (process.env.NODE_ENV !== "test") {
		const { auth } = require("express-openid-connect");
		const jwt = require("express-jwt");
		const jwksRsa = require("jwks-rsa");

		const config = {
			authRequired: false,
			auth0Logout: true,
			secret:
				process.env.AUTH_SECRET ||
				"a_long_randomly_generated_string_stored_in_env",
			baseURL: process.env.BASE_URL || "http://localhost:3000",
			clientID: "XgKTPvpKb06BkkADcGnd9E5M8fctMigK",
			issuerBaseURL: "https://dev-ly8kfge7r5g4gzlc.us.auth0.com",
			audience: "https://todoapi.example.com",
		};

		const checkJwt = jwt({
			secret: jwksRsa.expressJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri:
					"https://dev-ly8kfge7r5g4gzlc.us.auth0.com/.well-known/jwks.json",
			}),
			audience: "https://todoapi.example.com",
			issuer: "https://dev-ly8kfge7r5g4gzlc.us.auth0.com/",
			algorithms: ["RS256"],
		});

		app.use(auth(config));
		app.get("/api/protected", checkJwt, (req, res) => {
			res.status(200).json({
				message: "You are authenticated!",
				user: req.auth,
			});
		});
	}
};

configureAuth(app);

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to To-Do Backend!" });
});

const PORT = 3000;

sequelize
	.authenticate()
	.then(async () => {
		console.log("Database connected successfully");

		await Task.sync({ alter: true });
		if (process.env.NODE_ENV !== "test") {
			app.listen(PORT, () => {
				console.log(`Server running on http://localhost:${PORT}`);
			});
		}
	})
	.catch((err) => {
		console.error("Error connecting to the database:", err);
	});

export default app;
