import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const validateSession = async () => {
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
							console.warn(
								"Token is invalid or expired. Redirecting to login."
							);
							localStorage.removeItem("token");
							router.push("/api/auth/login");
						}
					} else {
						console.warn("No accessToken found in response.");
						router.push("/api/auth/login");
					}
				} else {
					console.error("Failed to fetch session. Redirecting to login.");
					router.push("/api/auth/login");
				}
			} catch (error) {
				console.error("Error fetching token:", error);
				router.push("/api/auth/login");
			}
		};

		validateSession();
	}, [router]);

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
