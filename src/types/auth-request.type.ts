import { Request } from "express";
import { JwtUser } from "./jwt.type";

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}