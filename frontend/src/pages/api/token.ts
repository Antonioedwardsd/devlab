import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method Not Allowed" });
		return;
	}

	try {
		const response = await axios.post(
			"https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/oauth/token",
			{
				client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
				audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
				grant_type: "client_credentials",
			},
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		res.status(200).json({ accessToken: response.data.access_token });
	} catch (error: any) {
		console.error(
			"Error fetching token:",
			error.response?.data || error.message
		);
		res.status(500).json({ error: "Failed to obtain access token" });
	}
}
