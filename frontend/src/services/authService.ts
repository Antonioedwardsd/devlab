import axios from "axios";

const getAccessToken = async () => {
	try {
		const response = await axios.post("/api/token");
		return response.data.accessToken;
	} catch (error) {
		console.error("Error fetching access token from backend:", error);
		throw new Error("Failed to obtain access token");
	}
};

export default getAccessToken;
