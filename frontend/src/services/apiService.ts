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

	const updateTask = async (id: string, updateData: Record<string, any>) => {
		try {
			const response = await axiosInstance.put(`/tasks/${id}`, updateData);
			console.log("Task updated:", response.data);
			return response.data;
		} catch (error: any) {
			console.error(
				"Error updating task:",
				error.response?.data || error.message
			);
			throw error;
		}
	};

	const deleteTask = async (id: string) => {
		try {
			const response = await axiosInstance.delete(`/tasks/${id}`);
			console.log("Task deleted:", response.data);
		} catch (error: any) {
			console.error(
				"Error deleting task:",
				error.response?.data || error.message
			);
			throw error;
		}
	};

	return { fetchTasks, createTask, updateTask, deleteTask };
};

export default apiService;
