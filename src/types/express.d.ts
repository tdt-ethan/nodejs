// Augment Express Request type to include our JWT payload
// Define JwtUser inline to avoid importing it in a declaration file

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: number;
				email: string;
			};
		}
	}
}

export {};
