// File: src/redux/todosSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';
import { UpdateTodoResponse, ErrorResponse, TodosState, TodoUpdateData } from '../interfaces';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    return await apiService().fetchTodos();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return thunkAPI.rejectWithValue({ message: errorMessage, statusCode: 500 } as ErrorResponse);
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (title: string, thunkAPI) => {
  try {
    return await apiService().createTodo(title);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return thunkAPI.rejectWithValue({ message: errorMessage, statusCode: 500 } as ErrorResponse);
  }
});

export const updateTodo = createAsyncThunk<UpdateTodoResponse, { id: string; updateData: TodoUpdateData }>(
  'todos/updateTodo',
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await apiService().updateTodo(id, updateData);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return thunkAPI.rejectWithValue({ message: errorMessage, statusCode: 500 } as ErrorResponse);
    }
  },
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string, thunkAPI) => {
  try {
    await apiService().deleteTodo(id);
    return id;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return thunkAPI.rejectWithValue({ message: errorMessage, statusCode: 500 } as ErrorResponse);
  }
});

// Slice
const todosSlice = createSlice({
  name: 'todos',
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
        const todos = action.payload || [];

        state.todos = todos.filter((todo) => todo && todo._id);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload.todo;

        if (!updatedTodo || !updatedTodo._id) {
          console.error('Updated todo or its _id is undefined:', updatedTodo);
          return;
        }
        state.todos = state.todos
          .filter((todo) => todo && todo._id)
          .map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo));
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
