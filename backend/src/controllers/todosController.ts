import { Request, Response } from 'express';
import Todo from '../models/TodoModel';
import { todoSchema, updateTodoSchema } from '../validators/todoValidator';
import { z } from 'zod';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = todoSchema.parse(req.body);

    const todo = await Todo.create(validatedData);
    res.status(201).json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo by ID:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ message: 'Todo ID is required.' });
      return;
    }

    const validatedData = updateTodoSchema.parse(req.body);

    const updatedTodo = await Todo.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo not found.' });
      return;
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
    } else {
      res.status(500).json({ error: 'An error occurred while updating the todo.' });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(202).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
