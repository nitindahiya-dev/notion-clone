import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { ZodError } from "zod";

import { AppError } from "../utils/app-error.js";

export const errorMiddleware = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error(error);

    /**
     * Zod validation error
     */
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: {
                message: "Validation failed",
                details: error.issues.map(
                    (issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    }),
                ),
            },
        });
    }

    /**
     * Application error
     */
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                message: error.message,
            },
        });
    }

    /**
     * Unknown error
     */
    return res.status(500).json({
        success: false,
        error: {
            message: "Internal server error",
        },
    });
};