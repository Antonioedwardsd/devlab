import { Request, Response } from "express";
import Task from "../models/taskModel";
import {
	createTaskSchema,
	updateTaskSchema,
} from "../validators/taskValidator";

export const createTaskController = async (req: Request, res: Response) => {
	try {
		console.log("Request Body:", req.body);
		const validatedData = createTaskSchema.parse(req.body);
		const task = await Task.create(validatedData);
		res.status(201).json(task);
	} catch (error) {
		console.error("Error in createTaskController:", error);
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: "An unexpected error occurred." });
		}
	}
};

export const getAllTasksController = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: "An unexpected error occurred." });
	}
};

export const getTaskByIdController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error: "An unexpected error occurred." });
	}
};

export const updateTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const validatedData = updateTaskSchema.parse(req.body);
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		await task.update(validatedData);
		res.status(200).json(task);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: "An unexpected error occurred." });
		}
	}
};

export const deleteTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		await task.destroy();
		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "An unexpected error occurred." });
	}
};
