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

	const fetchTodos = async () => {
		const response = await axiosInstance.get("/todos");
		return response.data;
	};

	const createTodo = async (title: string) => {
		const response = await axiosInstance.post("/todos", { title });
		return response.data;
	};

	const updateTodo = async (id: string, updateData: Record<string, any>) => {
		try {
			const response = await axiosInstance.put(`/todos/${id}`, updateData);
			return response.data;
		} catch (error: any) {
			console.error(
				"Error updating todo:",
				error.response?.data || error.message
			);
			throw error;
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			const response = await axiosInstance.delete(`/todos/${id}`);
			return response.data;
		} catch (error: any) {
			console.error(
				"Error deleting todo:",
				error.response?.data || error.message
			);
			throw error;
		}
	};

	return { fetchTodos, createTodo, updateTodo, deleteTodo };
};

export default apiService;
