import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import getAccessToken from './authService';
import { Todo, UpdateTodoResponse } from '../interfaces';

const apiService = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = await getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized. Redirecting to login.');
        window.localStorage.removeItem('sessionValidated');
        window.location.href = '/api/auth/login';
      }
      return Promise.reject(error);
    },
  );

  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axiosInstance.get<Todo[]>('/todos');
    return response.data;
  };

  const createTodo = async (title: string): Promise<Todo> => {
    const response = await axiosInstance.post<Todo>('/todos', { title });
    return response.data;
  };

  const updateTodo = async (id: string, updateData: Partial<Todo>): Promise<UpdateTodoResponse> => {
    try {
      const response = await axiosInstance.put<UpdateTodoResponse>(`/todos/${id}`, updateData);
      return response.data; // La respuesta tendrá la estructura `UpdateTodoResponse`
    } catch (error: unknown) {
      console.error('Error updating todo:', error instanceof Error ? error.message : error);
      throw error;
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
    } catch (error: unknown) {
      console.error('Error deleting todo:', error instanceof Error ? error.message : error);
      throw error;
    }
  };

  return { fetchTodos, createTodo, updateTodo, deleteTodo };
};

export default apiService;
