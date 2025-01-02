import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
});

const validateTodos = (todos: any[]) => {
	return todos.filter((todo) => todo.id && todo.title); // Excluye datos inválidos
};

export const fetchTasks = async () => {
	try {
		const response = await api.get("/todos");
		const validTodos = validateTodos(response.data);
		return validTodos;
	} catch (error: any) {
		console.error("Error in fetchTasks:", error.message);
		throw new Error("Failed to fetch todos");
	}
};
