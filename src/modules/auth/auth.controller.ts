import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { success, error } from "../../common/response";
import { logger } from "../../common/utils/logger";

/**
 * Register
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const result = await authService.register(email, password);

		return success(res, result, "User registered successfully", 201);
	} catch (error) {
		next(error);
	}
};

/**
 * Login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const tokens = await authService.login(email, password);

		return success(res, tokens, "Login successful");
	} catch (error) {
		next(error);
	}
};

/**
 * Refresh Access Token
 */
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return error(res, "Refresh token is required", 400);
		}

		const tokens = await authService.refresh(refreshToken);

		return success(res, tokens, "Token refreshed successfully");
	} catch (error) {
		next(error);
	}
};

/**
 * Logout
 * Requires auth middleware
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await authService.logout(req.user!.id);

		return success(res, null, "Logout successful");
	} catch (error) {
		next(error);
	}
};

/**
 * Get current user profile
 * Requires auth middleware
 */
export const me = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await authService.getProfile(req.user!.id);

		return success(res, user);
	} catch (error) {
		next(error);
	}
};
