import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof Error) {
		res.status(400).json({ error: err.message });
	} else {
		res.status(500).json({ error: "An unknown error occurred" });
	}
};
