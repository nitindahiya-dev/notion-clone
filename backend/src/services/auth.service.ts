import crypto from "crypto";

import { env } from "../config/env.js";
import { prisma } from "../database/prisma.js";
import { AppError } from "../utils/app-error.js";
import {
  comparePassword,
  hashPassword,
} from "../utils/hash.js";
import { generateAccessToken } from "../utils/jwt.js";
import { UserRepository } from "../repositories/user.repository.js";
import { SessionRepository } from "../repositories/session.repository.js";

export class AuthService {
  private userRepository = new UserRepository();

  private sessionRepository =
    new SessionRepository();

  private generateRefreshToken() {
    return crypto.randomBytes(48).toString("hex");
  }

  private hashRefreshToken(token: string) {
    return crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  }

  private getRefreshTokenExpiry() {
    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
      env.REFRESH_TOKEN_EXPIRES_DAYS,
    );

    return expiresAt;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    userAgent?: string;
    ipAddress?: string;
  }) {
    const existingUser =
      await this.userRepository.findByEmail(
        data.email,
      );

    if (existingUser) {
      throw new AppError(
        "An account with this email already exists",
        409,
      );
    }

    const passwordHash =
      await hashPassword(data.password);

    const user =
      await this.userRepository.create({
        name: data.name,
        email: data.email,
        password: passwordHash,
      });

    const accessToken =
      generateAccessToken({
        sub: user.id,
        email: user.email,
      });

    const refreshToken =
      this.generateRefreshToken();

    const tokenHash =
      this.hashRefreshToken(refreshToken);

    const expiresAt =
      this.getRefreshTokenExpiry();

    const session =
      await this.sessionRepository.createSession({
        userId: user.id,
        ...(data.userAgent !== undefined && {
          userAgent: data.userAgent,
        }),
        ...(data.ipAddress !== undefined && {
          ipAddress: data.ipAddress,
        }),
        expiresAt,
      });

    await this.sessionRepository.createRefreshToken({
      tokenHash,
      userId: user.id,
      sessionId: session.id,
      expiresAt,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(
    email: string,
    password: string,
    userAgent?: string,
    ipAddress?: string,
  ) {
    const user =
      await this.userRepository.findByEmail(
        email,
      );

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
      );
    }

    const passwordValid =
      await comparePassword(
        password,
        user.password,
      );

    if (!passwordValid) {
      throw new AppError(
        "Invalid email or password",
        401,
      );
    }

    const accessToken =
      generateAccessToken({
        sub: user.id,
        email: user.email,
      });

    const refreshToken =
      this.generateRefreshToken();

    const tokenHash =
      this.hashRefreshToken(refreshToken);

    const expiresAt =
      this.getRefreshTokenExpiry();

    const session =
      await this.sessionRepository.createSession({
        userId: user.id,
        ...(userAgent !== undefined && {
          userAgent,
        }),
        ...(ipAddress !== undefined && {
          ipAddress,
        }),
        expiresAt,
      });
    await this.sessionRepository.createRefreshToken({
      tokenHash,
      userId: user.id,
      sessionId: session.id,
      expiresAt,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const tokenHash =
      this.hashRefreshToken(refreshToken);

    const storedToken =
      await this.sessionRepository.findRefreshToken(
        tokenHash,
      );

    if (!storedToken) {
      throw new AppError(
        "Invalid refresh token",
        401,
      );
    }

    if (storedToken.revokedAt) {
      throw new AppError(
        "Refresh token has been revoked",
        401,
      );
    }

    if (
      storedToken.expiresAt <= new Date()
    ) {
      throw new AppError(
        "Refresh token has expired",
        401,
      );
    }

    if (
      storedToken.session.expiresAt <=
      new Date()
    ) {
      throw new AppError(
        "Session has expired",
        401,
      );
    }

    const newRefreshToken =
      this.generateRefreshToken();

    const newTokenHash =
      this.hashRefreshToken(
        newRefreshToken,
      );

    const newExpiresAt =
      this.getRefreshTokenExpiry();

    await this.sessionRepository.rotateRefreshToken(
      storedToken.id,
      {
        tokenHash: newTokenHash,
        userId: storedToken.userId,
        sessionId: storedToken.sessionId,
        expiresAt: newExpiresAt,
      },
    );

    const accessToken =
      generateAccessToken({
        sub: storedToken.user.id,
        email: storedToken.user.email,
      });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: storedToken.user.id,
        name: storedToken.user.name,
        email: storedToken.user.email,
      },
    };
  }

  async logout(refreshToken: string) {
    const tokenHash =
      this.hashRefreshToken(refreshToken);

    const storedToken =
      await this.sessionRepository.findRefreshToken(
        tokenHash,
      );

    if (!storedToken) {
      return;
    }

    await this.sessionRepository.revokeSession(
      storedToken.sessionId,
    );
  }

  async getUser(id: string) {
    const user =
      await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        "User not found",
        404,
      );
    }

    return user;
  }
}