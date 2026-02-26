import { Router } from "express";
import * as authController from "./auth.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validate } from "../../common/middlewares/validate.middleware";
import { registerSchema } from "./auth.schema";

const router = Router();

/**
 * Public routes
 */
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

/**
 * Protected routes
 */
router.get("/me", authMiddleware, authController.me);
router.post("/logout", authMiddleware, authController.logout);

export default router;
