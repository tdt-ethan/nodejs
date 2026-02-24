import { Router } from "express";
import * as controller from "./todo.controller";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.findAll);

export default router;
