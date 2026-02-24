import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = (title: string) => {
  return prisma.todo.create({
    data: { title }
  });
};

export const getTodos = () => {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" }
  });
};