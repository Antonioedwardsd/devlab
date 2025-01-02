import Task from "../models/taskModel";
import {
	createTaskSchema,
	updateTaskSchema,
} from "../validators/taskValidator";

export const createTask = async (data: {
	title: string;
	description?: string;
	completed?: boolean;
	status?: "pending" | "in-progress" | "completed";
}) => {
	try {
		const validatedData = createTaskSchema.parse(data); // Validación con Zod
		return await Task.create(validatedData);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Validation failed: " + error.message);
		} else {
			throw new Error("An unexpected error occurred during creation.");
		}
	}
};

export const getAllTasks = async () => {
	try {
		return await Task.findAll();
	} catch (error) {
		throw new Error("An unexpected error occurred while retrieving tasks.");
	}
};

export const getTaskById = async (id: string) => {
	try {
		const task = await Task.findByPk(id);
		if (!task) throw new Error("Task not found");
		return task;
	} catch (error) {
		throw new Error("An unexpected error occurred while retrieving the task.");
	}
};

export const updateTask = async (
	id: string,
	updates: {
		title?: string;
		description?: string;
		completed?: boolean;
		status?: string;
	}
) => {
	try {
		const validatedUpdates = updateTaskSchema.parse(updates); // Validación con Zod
		const task = await Task.findByPk(id);
		if (!task) return null;

		return await task.update(validatedUpdates);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Validation failed: " + error.message);
		} else {
			throw new Error("An unexpected error occurred during update.");
		}
	}
};

export const deleteTask = async (id: string) => {
	try {
		const task = await Task.findByPk(id);
		if (!task) return null;

		await task.destroy();
		return true;
	} catch (error) {
		throw new Error("An unexpected error occurred during deletion.");
	}
};
