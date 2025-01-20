import {
	getSession,
	handleAuth,
	handleLogin,
	handleLogout,
	handleCallback,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
	async login(req: NextApiRequest, res: NextApiResponse) {
		try {
			await handleLogin(req, res, {
				authorizationParams: {
					audience: "https://taskapi.com/api/tasks",
					scope:
						"openid profile email read:tasks create:tasks update:tasks delete:tasks",
				},
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			res.status((error as any)?.status || 500).end(errorMessage);
		}
	},

	async callback(req: NextApiRequest, res: NextApiResponse) {
		try {
			await handleCallback(req, res);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			res.status((error as any)?.status || 500).end(errorMessage);
		}
	},

	async logout(req: NextApiRequest, res: NextApiResponse) {
		try {
			await handleLogout(req, res, {
				returnTo: "http://localhost:3000/",
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			res.status((error as any)?.status || 500).end(errorMessage);
		}
	},

	async profile(req: NextApiRequest, res: NextApiResponse) {
		try {
			const session = await getSession(req, res);
			if (!session) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { user, accessToken } = session;
			res.status(200).json({ user, accessToken });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			res.status((error as any)?.status || 500).end(errorMessage);
		}
	},
});
