import { Router } from "express";
import * as controller from "./auth.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), controller.login);
router.post("/register", validate(registerSchema), controller.register);

export default router;
