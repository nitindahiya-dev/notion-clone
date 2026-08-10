import type {
  Request,
  Response,
  NextFunction,
} from "express";

import type { WorkspaceRole } from "@prisma/client";
import { getWorkspaceId } from "../utils/request.js";
import { WorkspaceRepository } from "../repositories/workspace.repository.js";
import { AppError } from "../utils/app-error.js";

const repository =
  new WorkspaceRepository();

export async function requireWorkspaceMember(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw new AppError(
        "Authentication required",
        401,
      );
    }

    const workspaceId = getWorkspaceId(req);

    if (!workspaceId) {
      throw new AppError(
        "Workspace ID is required",
        400,
      );
    }

    const membership =
      await repository.findUserMembership(
        workspaceId,
        req.user.id,
      );

    if (!membership) {
      throw new AppError(
        "You do not have access to this workspace",
        403,
      );
    }

    req.workspace = {
      id: workspaceId,
      role: membership.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export function requireWorkspaceRole(
  ...allowedRoles: WorkspaceRole[]
) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.workspace) {
        throw new AppError(
          "Workspace membership required",
          403,
        );
      }

      if (
        !allowedRoles.includes(
          req.workspace.role,
        )
      ) {
        throw new AppError(
          "You do not have permission to perform this action",
          403,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}