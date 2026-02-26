import jwt from "jsonwebtoken";
import { JwtUser } from "../../types/jwt.type";

export const generateAccessToken = (payload: JwtUser) => {
	return jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = (payload: JwtUser) => {
	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: "7d",
	});
};
