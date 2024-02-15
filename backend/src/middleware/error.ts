import { Request, Response, NextFunction } from "express";

export class ErrorCustom extends Error {
  public readonly statusCode: number;
  public readonly success: boolean;

  constructor(message: string, statusCode: number, success: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
  }
}

export const errorMiddleware = (
  err: (Error & Partial<ErrorCustom>) | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return res.status(err.statusCode ?? 400).json({
    statusCode: err.statusCode ?? 400,
    success: err.success ?? false,
    message: err.message ? err.issues ?? err.message : "Internal Server Error",
  });
};
