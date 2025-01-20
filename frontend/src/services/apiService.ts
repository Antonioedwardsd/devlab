import axios from "axios";
import getAccessToken from "./authService";

const apiService = () => {
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/api",
		headers: {
			"Content-Type": "application/json",
		},
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			if (typeof window !== "undefined") {
				const token = await getAccessToken();
				if (token && config.headers) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	const fetchTasks = async () => {
		const response = await axiosInstance.get("/tasks");
		return response.data;
	};

	const createTask = async (title: string) => {
		const response = await axiosInstance.post("/tasks", { title });
		return response.data;
	};

	const deleteTask = async (id: string) => {
		await axiosInstance.delete(`/tasks/${id}`);
	};

	return { fetchTasks, createTask, deleteTask };
};

export default apiService;
