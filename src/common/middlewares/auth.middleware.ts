import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../../types/jwt.type";
import { AppError } from "../errors/app.errors";
import { AuthenticatedRequest } from "../../types/auth-request.type";

export const authMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const header = req.headers.authorization;

		if (!header || !header.startsWith("Bearer ")) {
			throw new AppError("Unauthorized", 401);
		}

		const token = header.split(" ")[1];

		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;

			(req as AuthenticatedRequest).user = payload;
			next();
		} catch {
			throw new AppError("Invalid or expired token", 401);
		}
	} catch (error) {
		next(error);
	}
};
