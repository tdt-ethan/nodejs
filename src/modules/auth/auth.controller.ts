import { Request, Response, NextFunction } from "express";
import * as service from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await service.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = registerSchema.parse(req.body);
    const user = await service.register(email, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
