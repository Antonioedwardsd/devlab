import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";

const jwtCheck = auth({
	audience: "https://taskapi.com/api/tasks",
	issuerBaseURL: "https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/",
	tokenSigningAlg: "RS256",
});

export default (req: Request, res: Response, next: NextFunction): void => {
	//° PRUEBAS
	console.log("Incoming Request:");
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log("Authorization Header:", req.headers.authorization);

	jwtCheck(req, res, (err) => {
		if (err) {
			console.error("Token validation error:", err.message);
			return res
				.status(401)
				.json({ error: "Unauthorized", message: err.message });
		}
		//° PRUEBAS
		console.log("Decoded Token:", req.auth);
		next();
	});
};
