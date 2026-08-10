import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthService } from "../services/auth.service.js";
import { sendSuccess } from "../utils/response.js";
import { AppError } from "../utils/app-error.js";

const authService = new AuthService();

const REFRESH_COOKIE = "refresh_token";

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/v1/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.register({
        ...req.body,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
      });

    res.cookie(
      REFRESH_COOKIE,
      result.refreshToken,
      refreshCookieOptions,
    );

    return sendSuccess(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
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

    res.cookie(
      REFRESH_COOKIE,
      result.refreshToken,
      refreshCookieOptions,
    );

    return sendSuccess(res, {
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE];

    if (!refreshToken) {
      throw new AppError(
        "Refresh token required",
        401,
      );
    }

    const result =
      await authService.refresh(
        refreshToken,
      );

    res.cookie(
      REFRESH_COOKIE,
      result.refreshToken,
      refreshCookieOptions,
    );

    return sendSuccess(res, {
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE];

    if (refreshToken) {
      await authService.logout(
        refreshToken,
      );
    }

    res.clearCookie(
      REFRESH_COOKIE,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/api/v1/auth",
      },
    );

    return sendSuccess(res, {
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = (
      req as Request & {
        user?: {
          id: string;
          email: string;
        };
      }
    ).user?.id;

    if (!userId) {
      throw new AppError(
        "Authentication required",
        401,
      );
    }

    const user =
      await authService.getUser(userId);

    return sendSuccess(res, {
      user,
    });
  } catch (error) {
    next(error);
  }
}