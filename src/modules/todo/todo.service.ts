import { AppError } from "../../common/errors/app.errors";
import { todoRepository } from "./todo.repository";

export const createTodo = async (title: string) => {
	return todoRepository.create(title);
};

export const getTodos = async () => {
	return todoRepository.findAll();
};

export const getById = async (id: number) => {
	const todo = await todoRepository.findById(id);

	if (!todo) {
		throw new AppError("Todo not found", 404);
	}

	return todo;
};
