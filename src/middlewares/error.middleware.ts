import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err.name === "ZodError") {
		return res.status(400).json(err.errors);
	}

	console.error(err);
	res.status(500).json({ message: "Internal Server Error" });
};
