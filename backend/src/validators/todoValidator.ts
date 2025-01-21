import { z } from "zod";

export const todoSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	completed: z.boolean().optional(),
});

export const updateTodoSchema = todoSchema.partial();

export type TodoInput = z.infer<typeof todoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
