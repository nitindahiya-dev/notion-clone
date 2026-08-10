import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AccessTokenPayload {
  sub: string;
  email: string;
}

export function generateAccessToken(
  payload: object,
) {
  const expiresIn =
    env.JWT_ACCESS_EXPIRES_IN as NonNullable<
      jwt.SignOptions["expiresIn"]
    >;

  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn,
    },
  );
}

export function verifyAccessToken(
  token: string,
): AccessTokenPayload {
  return jwt.verify(
    token,
    env.JWT_SECRET,
  ) as AccessTokenPayload;
}