import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authRepository } from "./auth.repository";
import { AppError } from "../../common/errors/app.errors";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const login = async (email: string, password: string) => {
  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions,
  );

  return { token };
};

export const register = async (email: string, password: string) => {
  const existing = await authRepository.findByEmail(email);
  if (existing) {
    throw new AppError("Email already in use", 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  return authRepository.createUser(email, hashed);
};
