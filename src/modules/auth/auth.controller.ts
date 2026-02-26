import { Request, Response } from "express";
import * as authService from "./auth.service";

/**
 * Register
 */
export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await authService.register(email, password);

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		data: result,
	});
};

/**
 * Login
 */
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const tokens = await authService.login(email, password);

	res.status(200).json({
		success: true,
		message: "Login successful",
		data: tokens,
	});
};

/**
 * Refresh Access Token
 */
export const refresh = async (req: Request, res: Response) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({
			success: false,
			message: "Refresh token is required",
		});
	}

	const tokens = await authService.refresh(refreshToken);

	res.status(200).json({
		success: true,
		message: "Token refreshed successfully",
		data: tokens,
	});
};

/**
 * Logout
 * Requires auth middleware
 */
export const logout = async (req: Request, res: Response) => {
	await authService.logout(req.user!.id);

	res.status(200).json({
		success: true,
		message: "Logout successful",
	});
};

/**
 * Get current user profile
 * Requires auth middleware
 */
export const me = async (req: Request, res: Response) => {
	const user = await authService.getProfile(req.user!.id);

	res.status(200).json({
		success: true,
		data: user,
	});
};
