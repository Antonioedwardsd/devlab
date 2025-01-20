import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { title, description } = req.body;
		const task = await Task.create({ title, description });
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error: "Failed to create todo" });
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
	try {
		const { id } = req.params;
		const { title, description, completed } = req.body;
		const task = await Task.findByIdAndUpdate(
			id,
			{ title, description, completed },
			{ new: true }
		);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error: "Failed to update task" });
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
