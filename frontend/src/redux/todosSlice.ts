import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

interface Todo {
	_id: string;
	title: string;
	completed: boolean;
}

interface TodosState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}

const initialState: TodosState = {
	todos: [],
	loading: false,
	error: null,
};

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async (_, thunkAPI) => {
		try {
			return await apiService().fetchTodos();
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const createTodo = createAsyncThunk(
	"todos/createTodo",
	async (title: string, thunkAPI) => {
		try {
			return await apiService().createTodo(title);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (
		{ id, updateData }: { id: string; updateData: Record<string, any> },
		thunkAPI
	) => {
		try {
			const response = await apiService().updateTodo(id, updateData);
			return response;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async (id: string, thunkAPI) => {
		try {
			await apiService().deleteTodo(id);
			return id;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

// Slice
const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false;
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				const updatedTodo = action.payload.todo;
				const index = state.todos.findIndex(
					(todo) => todo._id === updatedTodo._id
				);
				if (index !== -1) {
					state.todos[index] = updatedTodo;
				}
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter((todo) => todo._id !== action.payload);
			});
	},
});

export default todosSlice.reducer;
