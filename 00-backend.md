## BACKEND FOLDER

# backend\src\_\_tests\_\_\controllers\todosController.test.ts

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index';
import Todo from '../../models/TodoModel';

describe('Todos Controller', () => {
// Before each test, clear the Todo collection
beforeEach(async () => {
await Todo.deleteMany({});
});

// After all tests, close the Mongoose connection
afterAll(async () => {
await mongoose.connection.close();
});

it('should create a new todo', async () => {
const response = await request(app).post('/api/todos').send({ title: 'Test Todo' }).expect(201);

    expect(response.body.title).toBe('Test Todo');
    expect(response.body.completed).toBe(false);

});

it('should retrieve all todos', async () => {
const todo1 = new Todo({ title: 'First Test Todo' });
const todo2 = new Todo({ title: 'Second Test Todo' });
await todo1.save();
await todo2.save();

    const response = await request(app).get('/api/todos').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe(todo1.title);
    expect(response.body[1].title).toBe(todo2.title);

});

it('should retrieve a todo by ID', async () => {
const newTodo = new Todo({ title: 'Test Todo' });
await newTodo.save();

    const response = await request(app).get(`/api/todos/${newTodo._id}`).expect(200);

    expect(response.body.title).toBe(newTodo.title);

});

it('should update an existing todo', async () => {
const newTodo = new Todo({ title: 'Test Todo' });
await newTodo.save();

    const response = await request(app)
      .put(`/api/todos/${newTodo._id}`)
      .send({ title: 'Updated Test Todo' })
      .expect(200);

    expect(response.body.todo.title).toBe('Updated Test Todo');

});

it('should delete an existing todo', async () => {
const newTodo = new Todo({ title: 'Test Todo' });
await newTodo.save();

    await request(app).delete(`/api/todos/${newTodo._id}`).expect(202);

    const deletedTodo = await Todo.findById(newTodo._id);
    expect(deletedTodo).toBeNull();

});

it('should return 404 when retrieving a non-existent todo', async () => {
const nonExistentId = new mongoose.Types.ObjectId();
await request(app).get(`/api/todos/${nonExistentId}`).expect(404);
});

it('should return 404 when updating a non-existent todo', async () => {
const nonExistentId = new mongoose.Types.ObjectId();
await request(app).put(`/api/todos/${nonExistentId}`).send({ title: 'Non-existent Todo' }).expect(404);
});

it('should return 404 when deleting a non-existent todo', async () => {
const nonExistentId = new mongoose.Types.ObjectId();
await request(app).delete(`/api/todos/${nonExistentId}`).expect(404);
});

it('should return 400 when creating a todo without a title', async () => {
await request(app).post('/api/todos').send({}).expect(400);
});

it('should return 400 when updating a todo with an empty title', async () => {
const newTodo = new Todo({ title: 'Test Todo' });
await newTodo.save();

    await request(app).put(`/api/todos/${newTodo._id}`).send({ title: '' }).expect(400);

});
});

# backend\src\config\database.ts

import mongoose from "mongoose";

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI || "");
console.log("MongoDB connected successfully.");
} catch (error) {
console.error("Error connecting to MongoDB:", error);
process.exit(1);
}
};

export default connectDB;

# backend\src\controllers\todosController.ts

import { Request, Response } from "express";
import Todo from "../models/TodoModel";
import { todoSchema, updateTodoSchema } from "../validators/todoValidator";
import { z } from "zod";

export const createTodo = async (
req: Request,
res: Response
): Promise<void> => {
try {
const validatedData = todoSchema.parse(req.body);

    	const todo = await Todo.create(validatedData);
    	res.status(201).json(todo);
    } catch (error) {
    	if (error instanceof z.ZodError) {
    		res
    			.status(400)
    			.json({ error: "Validation failed", details: error.errors });
    	} else {
    		res.status(500).json({ error: "Failed to create todo" });
    	}
    }

};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
try {
const todos = await Todo.find();
res.status(200).json(todos);
} catch (error) {
res.status(500).json({ error: "Failed to fetch todos" });
}
};

export const getTodoById = async (
req: Request,
res: Response
): Promise<void> => {
try {
const { id } = req.params;
const todo = await Todo.findById(id);
if (!todo) {
res.status(404).json({ error: "Todo not found" });
return;
}
res.status(200).json(todo);
} catch (error) {
res.status(500).json({ error: "Failed to fetch todo" });
}
};

export const updateTodo = async (
req: Request,
res: Response
): Promise<void> => {
const { id } = req.params;

    try {
    	if (!id) {
    		res.status(400).json({ message: "Todo ID is required." });
    		return;
    	}

    	const validatedData = updateTodoSchema.parse(req.body);

    	const updatedTodo = await Todo.findByIdAndUpdate(id, validatedData, {
    		new: true,
    		runValidators: true,
    	});

    	if (!updatedTodo) {
    		res.status(404).json({ message: "Todo not found." });
    		return;
    	}

    	res
    		.status(200)
    		.json({ message: "Todo updated successfully.", todo: updatedTodo });
    } catch (error) {
    	if (error instanceof z.ZodError) {
    		res
    			.status(400)
    			.json({ error: "Validation failed", details: error.errors });
    	} else {
    		res
    			.status(500)
    			.json({ error: "An error occurred while updating the todo." });
    	}
    }

};

export const deleteTodo = async (
req: Request,
res: Response
): Promise<void> => {
try {
const { id } = req.params;
const todo = await Todo.findByIdAndDelete(id);
if (!todo) {
res.status(404).json({ error: "Todo not found" });
return;
}
res.status(202).json({ message: "Todo deleted successfully" });
} catch (error) {
res.status(500).json({ error: "Failed to delete todo" });
}
};

# backend\src\middlewares\authMiddleware.ts

import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

const jwtCheck = auth({
audience: 'https://taskapi.com/api/tasks',
issuerBaseURL: 'https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/',
tokenSigningAlg: 'RS256',
});

export default (req: Request, res: Response, next: NextFunction): void => {
if (process.env.NODE_ENV === 'test') {
return next();
}
jwtCheck(req, res, (err) => {
if (err) {
console.error('Token validation error:', err.message);
return res.status(401).json({ error: 'Unauthorized', message: err.message });
}
next();
});
};

# backend\src\models\TodoModel.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
title: string;
description?: string;
completed: boolean;
createdAt: Date;
updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
{
title: { type: String, required: true },
description: { type: String },
completed: { type: Boolean, default: false },
},
{ timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
export default Todo;

# backend\src\routes\todosRoutes.ts

import { Router } from "express";
import {
createTodo,
getTodos,
getTodoById,
updateTodo,
deleteTodo,
} from "../controllers/todosController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoById);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;

# backend\src\services\authService.ts

import axios from "axios";

const getAccessToken = async () => {
try {
const response = await axios.post(
"https://dev-ic5orsxdvq2t72hh.us.auth0.com/oauth/token",
{
client_id: process.env.AUTH0_CLIENT_ID,
client_secret: process.env.AUTH0_CLIENT_SECRET,
audience: process.env.AUTH0_API_AUDIENCE,
grant_type: "client_credentials",
},
{
headers: {
"Content-Type": "application/json",
},
}
);

    	return response.data.access_token;
    } catch (error) {
    	console.error("Error fetching access token:", error);
    	throw new Error("Failed to obtain access token");
    }

};

export default getAccessToken;

# backend\src\validators\todoValidator.ts

import { z } from "zod";

export const todoSchema = z.object({
title: z.string().min(1, "Title is required").max(100, "Title is too long"),
completed: z.boolean().optional(),
});

export const updateTodoSchema = todoSchema.partial();

export type TodoInput = z.infer<typeof todoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

# backend\src\index.ts

import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import todosRoutes from './routes/todosRoutes';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

connectDB();

const app = express();

const **filename = fileURLToPath(import.meta.url);
const **dirname = path.dirname(\_\_filename);

const swaggerDocument = yaml.load(fs.readFileSync(path.join(\_\_dirname, 'swagger.yml'), 'utf8'));

app.use(
cors({
origin: 'http://localhost:3000',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
credentials: true,
}),
);

app.use(express.json());

app.use('/api/todos', todosRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response, \_next: NextFunction) => {
console.error('Unhandled error:', err.message);
res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
}

export default app;

# backend\package.json

{
"name": "backend",
"version": "1.0.0",
"main": "index.ts",
"scripts": {
"dev": "ts-node-dev --respawn --transpile-only src/index.ts",
"build": "tsc",
"start": "node dist/index.ts"
},
"keywords": [],
"author": "",
"license": "ISC",
"type": "module",
"description": "",
"dependencies": {
"cors": "^2.8.5",
"express": "^4.21.2",
"express-jwt": "^8.5.1",
"express-oauth2-jwt-bearer": "^1.6.0",
"jwks-rsa": "^3.1.0",
"jwt-decode": "^4.0.0",
"mongoose": "^8.9.5",
"swagger-ui-express": "^5.0.1",
"yamljs": "^0.3.0",
"zod": "^3.24.1"
},
"devDependencies": {
"@types/cors": "^2.8.17",
"@types/express": "^5.0.0",
"@types/swagger-ui-express": "^4.1.7",
"@types/yamljs": "^0.2.34",
"ts-node-dev": "^2.0.0"
}
}

# backend\swagger.yml

openapi: 3.0.0
info:
title: Todo API
description: API for managing todos
version: 1.0.0
servers:

- url: http://localhost:5000/api
  components:
  schemas:
  Todo:
  type: object
  properties:
  id:
  type: string
  title:
  type: string
  description:
  type: string
  completed:
  type: boolean
  createdAt:
  type: string
  format: date-time
  updatedAt:
  type: string
  format: date-time
  required: - title
  paths:
  /todos:
  get:
  summary: Get all todos
  tags: - Todos
  responses:
  200:
  description: List of todos
  content:
  application/json:
  schema:
  type: array
  items:
  $ref: '#/components/schemas/Todo'
  post:
  summary: Create a new todo
  tags: - Todos
  requestBody:
  required: true
  content:
  application/json:
  schema:
  type: object
  properties:
  title:
  type: string
  description:
  type: string
  completed:
  type: boolean
  responses:
  201:
  description: Todo created
  content:
  application/json:
  schema:
  $ref: '#/components/schemas/Todo'
  /todos/{id}:
  get:
  summary: Get a todo by ID
  tags: - Todos
  parameters: - name: id
  in: path
  required: true
  schema:
  type: string
  responses:
  200:
  description: A todo
  content:
  application/json:
  schema:
  $ref: '#/components/schemas/Todo'
  404:
  description: Todo not found
  put:
  summary: Update a todo by ID
  tags: - Todos
  parameters: - name: id
  in: path
  required: true
  schema:
  type: string
  requestBody:
  required: true
  content:
  application/json:
  schema:
  type: object
  properties:
  title:
  type: string
  description:
  type: string
  completed:
  type: boolean
  responses:
  200:
  description: Todo updated
  content:
  application/json:
  schema:
  $ref: '#/components/schemas/Todo'
  404:
  description: Todo not found
  delete:
  summary: Delete a todo by ID
  tags: - Todos
  parameters: - name: id
  in: path
  required: true
  schema:
  type: string
  responses:
  202:
  description: Todo deleted
  404:
  description: Todo not found

# backend\tsconfig.json

{
"compilerOptions": {
"module": "esnext",
"target": "esnext",
"moduleResolution": "node",
"outDir": "./dist",
"rootDir": "./src",
"strict": true,
"esModuleInterop": true,
"resolveJsonModule": true,
"incremental": true
},
"include": ["src/**/*.ts"],
"exclude": ["node_modules"]
}
