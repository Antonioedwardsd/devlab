import { Request, Response } from "express";
import Task from "../models/TaskModel";

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

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updateData = req.body;
	try {
		if (!id) {
			res.status(400).json({ message: "Task ID is required." });
			return;
		}

		const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
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
		console.error("Error updating task:", error);
		res
			.status(500)
			.json({ message: "An error occurred while updating the task." });
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
