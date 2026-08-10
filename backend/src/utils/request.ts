import type { Request } from "express";
import { AppError } from "./app-error.js";

export function getRouteParam(
  req: Request,
  name: string,
): string {
  const value = req.params[name];

  if (
    typeof value !== "string" ||
    value.length === 0
  ) {
    throw new AppError(
      `${name} is required`,
      400,
    );
  }

  return value;
}

export function getWorkspaceId(
  req: Request,
): string {
  return getRouteParam(req, "workspaceId");
}