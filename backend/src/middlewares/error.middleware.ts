import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../utils/app-error";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
    },
  });
}