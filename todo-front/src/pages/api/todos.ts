import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const validateTodos = (todos: any[]) => {
  return todos.filter((todo) => todo.id && todo.title);
};

export const fetchTasks = async () => {
  try {
    const response = await api.get('/todos');
    const validTodos = validateTodos(response.data);
    return validTodos;
  } catch (error: any) {
    console.error('Error in fetchTasks:', error.message);
    throw new Error('Failed to fetch todos');
  }
};

export const createTask = async (title: string, description: string) => {
  try {
    const response = await api.post('/todos', { title, description });
    return response.data;
  } catch (error: any) {
    console.error('Error in createTask:', error.message);
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (
  id: string,
  updates: { title?: string; description?: string },
) => {
  try {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error: any) {
    console.error('Error in updateTask:', error.message);
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: string) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error: any) {
    console.error('Error in deleteTask:', error.message);
    throw new Error('Failed to delete task');
  }
};
