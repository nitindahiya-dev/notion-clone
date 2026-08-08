import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthService } from "../services/auth.service";
import { sendSuccess } from "../utils/response";

const authService = new AuthService();

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.register(req.body);

    return sendSuccess(
      res,
      result,
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.login(
        req.body.email,
        req.body.password,
        req.headers["user-agent"],
        req.ip,
      );

    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/v1/auth",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return sendSuccess(res, {
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
}