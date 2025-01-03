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

import { auth } from "express-openid-connect";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorHandler);

const configureAuth = (app: express.Application) => {
	if (process.env.NODE_ENV !== "test") {
		const config = {
			authRequired: false,
			auth0Logout: true,
			secret:
				process.env.AUTH_SECRET ||
				"a_long_randomly_generated_string_stored_in_env",
			baseURL: process.env.BASE_URL || "http://localhost:5000",
			clientID: "XgKTPvpKb06BkkADcGnd9E5M8fctMigK",
			issuerBaseURL: "https://dev-ly8kfge7r5g4gzlc.us.auth0.com",
		};

		app.use(auth(config));

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

const PORT = process.env.PORT || 5000;

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
