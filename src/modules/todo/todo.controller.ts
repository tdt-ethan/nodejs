import { Request, Response, NextFunction } from "express";
import { TodoService } from "./todo.service";
import { AppError } from "../../common/errors/app.errors";

export class TodoController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw new AppError("Unauthorized", 401);
			}

			const todo = await TodoService.create(req.user.id, {
				title: req.body.title,
			});

			res.status(201).json({
				success: true,
				data: todo,
			});
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

			res.status(200).json({
				success: true,
				...result,
			});
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

			res.status(200).json({
				success: true,
				data: todo,
			});
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

			res.status(200).json({
				success: true,
				data: updated,
			});
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

			res.status(200).json({
				success: true,
				message: "Todo deleted",
			});
		} catch (error) {
			next(error);
		}
	}
}
