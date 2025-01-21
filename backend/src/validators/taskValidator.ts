import { z } from "zod";

export const taskSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(500, "Description is too long"),
	completed: z.boolean().optional(),
});

export const updateTaskSchema = taskSchema.partial();

export type TaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
