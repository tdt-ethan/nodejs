import { PrismaClient, Todo } from "@prisma/client";
import { AppError } from "../../common/errors/app.errors";

const prisma = new PrismaClient();

export class TodoService {
	/*
    CREATE TODO
  */
	static async create(userId: number, data: { title: string }) {
		if (!data.title?.trim()) {
			throw new AppError("Title is required", 400);
		}

		return prisma.todo.create({
			data: {
				title: data.title,
				userId,
			},
		});
	}

	/*
    GET ALL TODOS (exclude soft deleted)
    Optional pagination
  */
	static async getAll(userId: number, page = 1, limit = 10) {
		const skip = (page - 1) * limit;

		const [data, total] = await Promise.all([
			prisma.todo.findMany({
				where: {
					userId,
					deletedAt: null,
				},
				orderBy: { createdAt: "desc" },
				skip,
				take: limit,
			}),
			prisma.todo.count({
				where: {
					userId,
					deletedAt: null,
				},
			}),
		]);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	/*
    GET SINGLE TODO
  */
	static async getById(userId: number, todoId: number) {
		const todo = await prisma.todo.findFirst({
			where: {
				id: todoId,
				userId,
				deletedAt: null,
			},
		});

		if (!todo) {
			throw new AppError("Todo not found", 404);
		}

		return todo;
	}

	/*
    UPDATE TODO
  */
	static async update(
		userId: number,
		todoId: number,
		data: Partial<Pick<Todo, "title" | "completed">>,
	) {
		const todo = await prisma.todo.findFirst({
			where: {
				id: todoId,
				userId,
				deletedAt: null,
			},
		});

		if (!todo) {
			throw new AppError("Todo not found", 404);
		}

		return prisma.todo.update({
			where: { id: todoId },
			data,
		});
	}

	/*
    SOFT DELETE
  */
	static async delete(userId: number, todoId: number) {
		const todo = await prisma.todo.findFirst({
			where: {
				id: todoId,
				userId,
				deletedAt: null,
			},
		});

		if (!todo) {
			throw new AppError("Todo not found", 404);
		}

		return prisma.todo.update({
			where: { id: todoId },
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
