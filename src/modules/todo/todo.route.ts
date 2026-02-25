import { Router } from "express";
import * as controller from "./todo.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { todoIdParamSchema } from "./todo.schema";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get(
	"/:id",
	validate(todoIdParamSchema, "params"),
	controller.getTodoByIdController,
);

export default router;
