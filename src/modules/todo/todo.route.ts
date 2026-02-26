import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { TodoController } from "./todo.controller";

const router = Router();

/**
 * Protect all todo routes
 */
router.use(authMiddleware);

router.post("/", TodoController.create);
router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getById);
router.patch("/:id", TodoController.update);
router.delete("/:id", TodoController.delete);

export default router;
