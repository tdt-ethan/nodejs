import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
	(schema: ZodSchema, property: "body" | "params" | "query" = "body") =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req[property]);

		if (!result.success) {
			return res.status(400).json(result.error);
		}

		req[property] = result.data;
		next();
	};
