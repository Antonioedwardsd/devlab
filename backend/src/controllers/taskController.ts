import { Request, Response } from "express";
import Task from "../models/TaskModel";
import { taskSchema, updateTaskSchema } from "../validators/taskValidator";
import { z } from "zod";

export const createTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const validatedData = taskSchema.parse(req.body);

		const task = await Task.create(validatedData);
		res.status(201).json(task);
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

export const getTasks = async (req: Request, res: Response): Promise<void> => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
};

export const getTaskById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch task" });
	}
};

export const updateTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		if (!id) {
			res.status(400).json({ message: "Task ID is required." });
			return;
		}

		const validatedData = updateTaskSchema.parse(req.body);

		const updatedTask = await Task.findByIdAndUpdate(id, validatedData, {
			new: true,
			runValidators: true,
		});

		if (!updatedTask) {
			res.status(404).json({ message: "Task not found." });
			return;
		}

		res
			.status(200)
			.json({ message: "Task updated successfully.", task: updatedTask });
	} catch (error) {
		if (error instanceof z.ZodError) {
			res
				.status(400)
				.json({ error: "Validation failed", details: error.errors });
		} else {
			res
				.status(500)
				.json({ error: "An error occurred while updating the task." });
		}
	}
};

export const deleteTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndDelete(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		res.status(202).json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete task" });
	}
};
