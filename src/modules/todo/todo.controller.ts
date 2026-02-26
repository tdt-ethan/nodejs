import { Request, Response, NextFunction } from "express";
import { TodoService } from "./todo.service";
import { AppError } from "../../common/errors/app.errors";
import { success } from "../../common/response";

export class TodoController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const todo = await TodoService.create(req.user.id, {
				title: req.body.title,
			});

			return success(res, todo, "Todo created", 201);
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;

			const result = await TodoService.getAll(req.user.id, page, limit);

			return success(res, result);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new AppError("Invalid todo id", 400);
			}

			const todo = await TodoService.getById(req.user.id, id);

			return success(res, todo);
		} catch (error) {
			next(error);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new AppError("Invalid todo id", 400);
			}

			const updated = await TodoService.update(req.user.id, id, {
				title: req.body.title,
				completed: req.body.completed,
			});

			return success(res, updated);
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new AppError("Invalid todo id", 400);
			}

			await TodoService.delete(req.user.id, id);

			return success(res, null, "Todo deleted");
		} catch (error) {
			next(error);
		}
	}
}
