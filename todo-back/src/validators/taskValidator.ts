import { z } from "zod";

export const createTaskSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().optional(),
	completed: z.boolean().optional().default(false),
	status: z
		.enum(["pending", "in-progress", "completed"])
		.optional()
		.default("pending"),
});

export const updateTaskSchema = createTaskSchema.partial();
