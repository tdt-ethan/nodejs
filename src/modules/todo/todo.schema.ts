import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1),
});

export const todoIdParamSchema = z.object({
	id: z.string().regex(/^\d+$/, "Invalid id format"),
});
