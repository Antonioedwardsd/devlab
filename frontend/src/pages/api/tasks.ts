import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, AccessTokenRequest } from "@auth0/nextjs-auth0";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		console.log("API Route called:", req.method);

		// Obtén el Access Token con audiencia y scope
		const { accessToken } = await getAccessToken(req, res, {
			audience: "https://dev-ic5orsxdvq2t72hh.us.auth0.com/api/v2/",
			scope: "openid profile email",
		} as AccessTokenRequest);
		console.log("Access Token:", accessToken);

		if (!accessToken) {
			console.error("No access token found");
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		console.log("Access token retrieved:", accessToken);

		// Almacena el token en localStorage (opcional, para pruebas futuras)
		if (typeof window !== "undefined") {
			localStorage.setItem("token", accessToken);
			console.log("Token stored in localStorage:", accessToken);
		}

		// Realiza la solicitud al backend
		const backendResponse = await fetch("http://localhost:5000/api/tasks", {
			method: req.method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
		});

		console.log(`Backend response status: ${backendResponse.status}`);

		// Intenta obtener el texto de respuesta del backend
		const text = await backendResponse.text();
		console.log("Backend response text:", text);

		// Intenta analizar la respuesta como JSON
		try {
			const data = JSON.parse(text);
			console.log("Backend response data:", data);
			res.status(backendResponse.status).json(data);
		} catch (err) {
			console.error("Failed to parse backend response JSON:", err);
			res.status(backendResponse.status).send(text);
		}
	} catch (error: any) {
		console.error("Error in API Route:", error.message || error);
		res.status(500).json({ error: "Internal server error" });
	}
}
