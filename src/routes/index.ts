import { Router } from "express";

import todoRoutes from "../modules/todo/todo.route";
import authRoutes from "../modules/auth/auth.route";

const router = Router();

router.use("/todos", todoRoutes);
router.use("/auth", authRoutes);

export default router;
