## FRONTEND FOLDER

# frontend\src\components\TodoList.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../redux/todosSlice';

const Container = styled.div`  background-color: #20232a;
  color: #ffffff;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;`;

const Title = styled.h1`  font-size: 2rem;
  margin-bottom: 20px;
  color: #61dafb;`;

const InputContainer = styled.div`  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;`;

const Input = styled.input<{ $editing?: boolean }>`
  background-color: ${(props) => (props.$editing ? '#20232a' : '#282c34')};
color: #ffffff;
border: 1px solid #61dafb;
border-radius: 5px;
padding: 10px;
font-size: 1rem;
flex: 1;
margin-right: 10px;
`;

const AddButton = styled.button`
background-color: #61dafb;
color: #20232a;
border: none;
border-radius: 5px;
padding: 10px 15px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease;
flex-shrink: 0;

&:hover {
background-color: #21a1f1;
}
`;

const TodoContainer = styled.div`  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;`;

const Todo = styled.div<{ $editing: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.$editing ? '#394867' : '#282c34')};
padding: 15px;
border-radius: 5px;
border: 1px solid #61dafb;
`;

const TodoText = styled.p<{ $completed: boolean }>`
  margin: 0;
  color: ${(props) => (props.$completed ? '#61dafb' : '#ffffff')};
text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
font-size: 1rem;
`;

const Checkbox = styled.input`  margin-right: 10px;`;

const EditButton = styled.button`
background-color: transparent;
color: #61dafb;
border: none;
cursor: pointer;
font-size: 1rem;
margin-right: 10px;

&:hover {
text-decoration: underline;
}
`;

const DeleteButton = styled(EditButton)`
color: #e74c3c;

&:hover {
color: #c0392b;
}
`;

const ButtonGroup = styled.div`  display: flex;
  align-items: center;
  gap: 10px;`;

const TodoList: React.FC = () => {
const dispatch: AppDispatch = useDispatch();
const { todos, loading, error } = useSelector((state: RootState) => state.todos);

const [newTodo, setNewTodo] = useState('');
const [editValue, setEditValue] = useState('');
const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

useEffect(() => {
dispatch(fetchTodos());
}, [dispatch]);

const handleAddTodo = () => {
if (newTodo.trim()) {
dispatch(createTodo(newTodo));
setNewTodo('');
}
};

const handleEditTodo = (id: string) => {
setEditingTodoId(id);
const todo = todos.find((todo) => todo.\_id === id);
if (todo) setEditValue(todo.title);
};

const handleSaveEdit = async () => {
if (editingTodoId) {
try {
await dispatch(updateTodo({ id: editingTodoId, updateData: { title: editValue } })).unwrap();
} catch (error) {
console.error('Failed to save edit:', error);
} finally {
setEditingTodoId(null);
setEditValue('');
}
}
};

const handleDeleteTodo = (id: string) => {
dispatch(deleteTodo(id));
};

const toggleCompleted = (id: string, completed: boolean) => {
dispatch(updateTodo({ id, updateData: { completed: !completed } }));
};

if (loading) return <Container>Loading...</Container>;
if (error) return <Container>Error: {error}</Container>;

return (
<Container>

<Title>Todo List</Title>
<InputContainer>
<Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="What do you have planned?" />
<AddButton onClick={handleAddTodo}>Add Todo</AddButton>
</InputContainer>
<TodoContainer>
{todos?.length > 0 ? (
todos.map((todo) => (
<Todo key={todo.\_id} $editing={editingTodoId === todo.\_id}>
<div style={{ display: 'flex', alignItems: 'center' }}>
<Checkbox
type="checkbox"
checked={todo.completed}
onChange={() => toggleCompleted(todo.\_id, todo.completed)}
/>
{editingTodoId === todo.\_id ? (
<Input $editing value={editValue} onChange={(e) => setEditValue(e.target.value)} />
) : (
<TodoText $completed={todo.completed}>{todo.title}</TodoText>
)}
</div>
<ButtonGroup>
{editingTodoId === todo.\_id ? (
<>
<AddButton onClick={handleSaveEdit}>Save</AddButton>
<DeleteButton onClick={() => setEditingTodoId(null)}>Cancel</DeleteButton>
</>
) : (
<>
<EditButton onClick={() => handleEditTodo(todo.\_id)}>Edit</EditButton>
<DeleteButton onClick={() => handleDeleteTodo(todo.\_id)}>Delete</DeleteButton>
</>
)}
</ButtonGroup>
</Todo>
))
) : (
<p>No tasks available.</p>
)}
</TodoContainer>
</Container>
);
};

export default TodoList;

# frontend\src\pages\api\auth\[auth0].ts

import auth0 from '../../../utils/initAuth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default auth0.handleAuth({
async login(req: NextApiRequest, res: NextApiResponse) {
await auth0.handleLogin(req, res);
},

async logout(req: NextApiRequest, res: NextApiResponse) {
await auth0.handleLogout(req, res);
},

async callback(req: NextApiRequest, res: NextApiResponse) {
await auth0.handleCallback(req, res);
},

async profile(req: NextApiRequest, res: NextApiResponse) {
const session = await auth0.getSession(req, res);

    if (!session) {
      console.error('No active session found.');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({ user: session.user });

},
});

# frontend\src\pages\api\todos.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, AccessTokenRequest } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
const { accessToken } = await getAccessToken(req, res, {
audience: 'https://dev-ic5orsxdvq2t72hh.us.auth0.com/api/v2/',
scope: 'openid profile email',
} as AccessTokenRequest);

    if (!accessToken) {
      console.error('No access token found');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', accessToken);
    }

    const backendResponse = await fetch('http://localhost:5000/api/todos', {
      method: req.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const text = await backendResponse.text();

    try {
      const data = JSON.parse(text);
      res.status(backendResponse.status).json(data);
    } catch (err: unknown) {
      console.error('Failed to parse backend response JSON:', err);
      res.status(backendResponse.status).send(text);
    }

} catch (error: unknown) {
console.error('Error in API Route:', error instanceof Error ? error.message : error);
res.status(500).json({ error: 'Internal server error' });
}
}

# frontend\src\pages\api\token.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'POST') {
res.status(405).json({ error: 'Method Not Allowed' });
return;
}

try {
const response = await axios.post(
'https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/oauth/token',
{
client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
grant_type: 'client_credentials',
},
{
headers: { 'Content-Type': 'application/json' },
},
);

    res.status(200).json({ accessToken: response.data.access_token });

} catch (error: unknown) {
console.error('Error fetching token:', error instanceof Error ? error.message : error);
res.status(500).json({ error: 'Failed to obtain access token' });
}
}

# frontend\src\pages_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
const router = useRouter();

useEffect(() => {
const validateSession = async () => {
if (localStorage.getItem('sessionValidated')) {
return;
}

      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          localStorage.setItem('sessionValidated', 'true');
        } else {
          console.error('Failed to fetch session. Redirecting to login.');
          router.push('/api/auth/login');
        }
      } catch (error) {
        console.error('Error validating session:', error);
        router.push('/api/auth/login');
      }
    };

    validateSession();

}, [router]);

return (
<UserProvider>
<Provider store={store}>
<Component {...pageProps} />
</Provider>
</UserProvider>
);
}

# frontend\src\pages_document.tsx

import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
const sheet = new ServerStyleSheet();
const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }

}

render() {
return (

<Html lang="en">
<Head />
<body>
<Main />
<NextScript />
</body>
</Html>
);
}
}

# frontend\src\pages\index.tsx

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';

const Container = styled.div`  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #20232a;
  color: #ffffff;
  font-family: Arial, sans-serif;`;

const Title = styled.h1`  font-size: 2.5rem;
  color: #61dafb;
  margin-bottom: 20px;`;

const ButtonContainer = styled.div`  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;`;

const StyledLink = styled.a`
background-color: #61dafb;
color: #20232a;
text-decoration: none;
padding: 10px 20px;
border-radius: 5px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
background-color: #21a1f1;
}
`;

const Home = () => {
const { user, error, isLoading } = useUser();

if (isLoading) return <Container>Loading...</Container>;
if (error) return <Container>Error: {error.message}</Container>;

const handleLogin = async () => {
window.location.href = '/api/auth/login';
};

if (user) {
return (
<Container>

<Title>Hello {user.name} 👋</Title>
<ButtonContainer>
<StyledLink href="/todos">Go to Todos</StyledLink>
<StyledLink href="/api/auth/logout">Logout</StyledLink>
</ButtonContainer>
</Container>
);
}

return (
<Container>

<Title>Please Log In</Title>
<ButtonContainer>
<button onClick={handleLogin}>Login</button>
</ButtonContainer>
</Container>
);
};

export default Home;

# frontend\src\pages\todos.tsx

import TodoList from "../components/TodoList";

const TodosPage = () => {
return <TodoList />;
};

export default TodosPage;

# frontend\src\redux\store.ts

import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

export const store = configureStore({
reducer: {
todos: todosReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

# frontend\src\redux\todosSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';
import { UpdateTodoResponse, ErrorResponse, TodosState, TodoUpdateData } from '../interfaces';

const initialState: TodosState = {
todos: [],
loading: false,
error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (\_, thunkAPI) => {
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
state.todos = state.todos.map((todo) => (todo.\_id === updatedTodo.\_id ? updatedTodo : todo));
})
.addCase(deleteTodo.fulfilled, (state, action) => {
state.todos = state.todos.filter((todo) => todo.\_id !== action.payload);
});
},
});

export default todosSlice.reducer;

# frontend\src\services\apiService.ts

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

# frontend\src\services\authService.ts

import axios from 'axios';

const isTokenExpired = (token: string): boolean => {
try {
const payload = JSON.parse(atob(token.split('.')[1]));
return Date.now() >= payload.exp \* 1000;
} catch {
return true;
}
};

const getAccessToken = async (): Promise<string> => {
try {
let token = localStorage.getItem('accessToken') || '';

    if (!token || isTokenExpired(token)) {
      const response = await axios.post('/api/token');
      token = response.data.accessToken || '';
      localStorage.setItem('accessToken', token);
    }

    return token;

} catch {
throw new Error('Failed to obtain access token');
}
};

export default getAccessToken;

# frontend\src\utils\initAuth0.ts

import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
clientID:
process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ||
"Ag9aOPYe7gF4bI5QoHkobG6R9VldfuZv",
clientSecret:
process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET ||
"co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi",
issuerBaseURL:
process.env.NEXT_PUBLIC_AUTH0_ISSUER ||
"https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/",
baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
authorizationParams: {
audience:
process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE ||
"https://taskapi.com/api/tasks",
scope:
"openid profile email read:todos create:todos update:todos delete:todos",
},
});

# frontend\next.config.ts

// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: true,
compiler: {
styledComponents: true,
},
env: {
AUTH0_SECRET:
"co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi",
AUTH0_BASE_URL: "http://localhost:3000",
AUTH0_ISSUER_BASE_URL: "https://dev-3iiyrnf7x5ya3qwp.us.auth0.com",
AUTH0_CLIENT_ID: "Ag9aOPYe7gF4bI5QoHkobG6R9VldfuZv",
AUTH0_CLIENT_SECRET:
"co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi",
},
};

export default nextConfig;

# frontend\src\interfaces.ts

export interface Todo {
\_id: string;
title: string;
description?: string;
completed: boolean;
}

export interface UpdateTodoResponse {
message: string;
todo: Todo;
}

export interface ErrorResponse {
message: string;
statusCode: number;
}

export interface TodosState {
todos: Todo[];
loading: boolean;
error: string | null;
}

export interface TodoUpdateData {
title?: string;
completed?: boolean;
}

# frontend\tsconfig.json

{
"compilerOptions": {
"target": "ES2017",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"noEmit": true,
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "preserve",
"incremental": true,
"paths": {
"@/_": ["./src/_"]
}
},
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
"exclude": ["node_modules", ".next"]
}
