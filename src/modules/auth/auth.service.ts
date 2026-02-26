import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { generateAccessToken, generateRefreshToken } from "./auth.utils";
import { JwtUser } from "../../types/jwt.type";
import { AppError } from "../../common/errors/app.errors";

const SALT_ROUNDS = 10;

export const register = async (email: string, password: string) => {
	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		throw new AppError("Email already exists", 400);
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
		select: {
			id: true,
			email: true,
			createdAt: true,
		},
	});

	return user;
};

/**
 * Login
 */
export const login = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new AppError("Invalid credentials", 401);
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new AppError("Invalid credentials", 401);
	}

	const payload: JwtUser = {
		id: user.id,
		email: user.email,
	};

	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	// hash refresh token trước khi lưu DB
	const hashedRefreshToken = await bcrypt.hash(refreshToken, SALT_ROUNDS);

	await prisma.user.update({
		where: { id: user.id },
		data: { refreshToken: hashedRefreshToken },
	});

	return {
		accessToken,
		refreshToken,
	};
};

/**
 * Refresh token (rotation)
 */
export const refresh = async (refreshToken: string) => {
	let payload: JwtUser;

	try {
		payload = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET!,
		) as JwtUser;
	} catch {
		throw new AppError("Invalid refresh token", 401);
	}

	const user = await prisma.user.findUnique({
		where: { id: payload.id },
	});

	if (!user || !user.refreshToken) {
		throw new AppError("Unauthorized", 401);
	}

	const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

	if (!isMatch) {
		throw new AppError("Unauthorized", 401);
	}

	const newPayload: JwtUser = {
		id: user.id,
		email: user.email,
	};

	const newAccessToken = generateAccessToken(newPayload);
	const newRefreshToken = generateRefreshToken(newPayload);

	const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, SALT_ROUNDS);

	await prisma.user.update({
		where: { id: user.id },
		data: { refreshToken: hashedNewRefreshToken },
	});

	return {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
	};
};

/**
 * Logout
 */
export const logout = async (userId: number) => {
	await prisma.user.update({
		where: { id: userId },
		data: { refreshToken: null },
	});

	return;
};

/**
 * Get profile
 */
export const getProfile = async (userId: number) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			createdAt: true,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	return user;
};
