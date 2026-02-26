import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.errors";
import { error as errorResponse } from "../response";

/**
 * Global error handler middleware
 * Must be placed after all other middleware and routes
 */
export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Don't override if response is already sent
	if (res.headersSent) {
		return next(err);
	}

	// Handle AppError instances
	if (err instanceof AppError) {
		return errorResponse(res, err.message, err.statusCode);
	}

	// Handle other errors
	console.error("Unhandled error:", err);
	return errorResponse(res, "Internal Server Error", 500);
};
