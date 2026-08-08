import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { WorkspaceService } from "../services/workspace.service";
import { AppError } from "../utils/app-error";
import { sendSuccess } from "../utils/response";

const service =
  new WorkspaceService();

function getUserId(req: Request) {
  if (!req.user) {
    throw new AppError(
      "Authentication required",
      401,
    );
  }

  return req.user.id;
}

export async function createWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);

    const workspace =
      await service.createWorkspace(
        userId,
        req.body,
      );

    return sendSuccess(
      res,
      { workspace },
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaces(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);

    const workspaces =
      await service.getUserWorkspaces(
        userId,
      );

    return sendSuccess(res, {
      workspaces,
    });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);

    const workspace =
      await service.getWorkspace(
        req.params.workspaceId,
        userId,
      );

    return sendSuccess(res, {
      workspace,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const workspace =
      await service.updateWorkspace(
        req.params.workspaceId,
        getUserId(req),
        req.body,
      );

    return sendSuccess(res, {
      workspace,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await service.deleteWorkspace(
      req.params.workspaceId,
      getUserId(req),
    );

    return sendSuccess(res, {
      message:
        "Workspace deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}