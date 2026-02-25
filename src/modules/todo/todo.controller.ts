import { Request, Response } from "express";
import * as service from "./todo.service";
import { createTodoSchema } from "./todo.schema";

export const create = async (req: Request, res: Response) => {
	const parsed = createTodoSchema.parse(req.body);
	const todo = await service.createTodo(parsed.title);
	res.status(201).json(todo);
};

export const findAll = async (_req: Request, res: Response) => {
	const todos = await service.getTodos();
	res.json(todos);
};

export const getTodoByIdController = async (
	req: Request,
	res: Response,
	next: any,
) => {
	try {
		const id = Number(req.params.id);

		const todo = await service.getById(id);

		res.json(todo);
	} catch (error) {
		next(error);
	}
};
