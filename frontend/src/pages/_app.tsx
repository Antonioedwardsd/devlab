import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const fetchToken = async () => {
			try {
				const res = await fetch("/api/auth/me", {
					headers: { "Content-Type": "application/json" },
				});

				if (res.ok) {
					const data = await res.json();
					const token = data.accessToken;

					if (token) {
						// Validate token before storing
						if (isValidToken(token)) {
							localStorage.setItem("token", token);
						} else {
							console.warn("Token is invalid or expired.");
						}
					} else {
						console.warn("No accessToken found in response.");
					}
				} else {
					console.error(
						`Failed to fetch token. Status: ${
							res.status
						}, Message: ${await res.text()}`
					);
				}
			} catch (error) {
				console.error("Error fetching token:", error);
			}
		};

		fetchToken();
	}, []);

	const isValidToken = (token: string): boolean => {
		try {
			const decoded: any = jwtDecode(token);
			return decoded.exp * 1000 > Date.now();
		} catch (error) {
			console.error("Invalid token:", error);
			return false;
		}
	};

	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}
