import crypto from "crypto";

import { prisma } from "../database/prisma";
import { UserRepository } from "../repositories/user.repository";
import {
  comparePassword,
  hashPassword,
} from "../utils/hash";
import { generateAccessToken } from "../utils/jwt";
import { env } from "../config/env";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser =
      await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    const passwordHash = await hashPassword(
      data.password,
    );

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });

    return {
      user,
      accessToken: generateAccessToken({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async login(
    email: string,
    password: string,
    userAgent?: string,
    ipAddress?: string,
  ) {
    const user =
      await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordValid =
      await comparePassword(
        password,
        user.password,
      );

    if (!passwordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken({
      sub: user.id,
      email: user.email,
    });

    const refreshToken =
      crypto.randomBytes(48).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
        env.REFRESH_TOKEN_EXPIRES_DAYS,
    );

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        userAgent,
        ipAddress,
        expiresAt,
      },
    });

    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        sessionId: session.id,
        expiresAt,
      },
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

  async getUser(id: string) {
    const user =
      await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}