import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, AccessTokenRequest } from "@auth0/nextjs-auth0";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { accessToken } = await getAccessToken(req, res, {
			audience: "https://dev-ic5orsxdvq2t72hh.us.auth0.com/api/v2/",
			scope: "openid profile email",
		} as AccessTokenRequest);

		if (!accessToken) {
			console.error("No access token found");
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		if (typeof window !== "undefined") {
			localStorage.setItem("token", accessToken);
		}

		const backendResponse = await fetch("http://localhost:5000/api/todos", {
			method: req.method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
		});

		const text = await backendResponse.text();

		try {
			const data = JSON.parse(text);
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
