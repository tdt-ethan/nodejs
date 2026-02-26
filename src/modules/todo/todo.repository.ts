import { prisma } from "../../config/prisma";

export const todoRepository = {
	create(data: { title: string; userId: number }) {
		return prisma.todo.create({ data });
	},

	findMany(params: any) {
		return prisma.todo.findMany(params);
	},

	count(where: any) {
		return prisma.todo.count({ where });
	},

	findById(id: number) {
		return prisma.todo.findFirst({
			where: { id, deletedAt: null },
		});
	},

	update(id: number, data: any) {
		return prisma.todo.update({
			where: { id },
			data,
		});
	},
};
