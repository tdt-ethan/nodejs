import { Response } from "express";

interface SuccessPayload<T = any> {
  success: true;
  message?: string;
  data: T;
}

interface ErrorPayload {
  success: false;
  message: string;
}

export const success = <T = any>(
  res: Response,
  data: T,
  message = "OK",
  status = 200,
) => {
  const payload: SuccessPayload<T> = { success: true, message, data };
  return res.status(status).json(payload);
};

export const error = (
  res: Response,
  message = "Internal Server Error",
  status = 500,
) => {
  const payload: ErrorPayload = { success: false, message };
  return res.status(status).json(payload);
};
