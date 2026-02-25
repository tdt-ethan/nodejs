import { prisma } from "../../config/prisma";

export const authRepository = {
	createUser(email: string, password: string) {
		return prisma.user.create({
			data: { email, password },
		});
	},

	findByEmail(email: string) {
		return prisma.user.findUnique({
			where: { email },
		});
	},
};
