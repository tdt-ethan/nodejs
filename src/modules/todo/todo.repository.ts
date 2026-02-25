import { prisma } from "../../config/prisma";

export const todoRepository = {
	create(title: string) {
		return prisma.todo.create({
			data: { title },
		});
	},

	findAll() {
		return prisma.todo.findMany({
			orderBy: { createdAt: "desc" },
		});
	},

	findById(id: number) {
		return prisma.todo.findUnique({
			where: { id },
		});
	},
};
