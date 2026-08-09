import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { WorkspaceService } from "../services/workspace.service";
import { AppError } from "../utils/app-error";
import { sendSuccess } from "../utils/response";

const service = new WorkspaceService();

function getUserId(req: Request): string {
  if (!req.user) {
    throw new AppError(
      "Authentication required",
      401,
    );
  }

  return req.user.id;
}

// ─────────────────────────────────────────────
// Workspace
// ─────────────────────────────────────────────

export async function createWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const workspace =
      await service.createWorkspace(
        getUserId(req),
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
    const workspaces =
      await service.getUserWorkspaces(
        getUserId(req),
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
    const workspace =
      await service.getWorkspace(
        req.params.workspaceId,
        getUserId(req),
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

// ─────────────────────────────────────────────
// Members
// ─────────────────────────────────────────────

export async function getMembers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const members =
      await service.getMembers(
        req.params.workspaceId,
        getUserId(req),
      );

    return sendSuccess(res, {
      members,
    });
  } catch (error) {
    next(error);
  }
}

export async function addMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const member =
      await service.addMember(
        req.params.workspaceId,
        getUserId(req),
        req.body,
      );

    return sendSuccess(
      res,
      { member },
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateMemberRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const member =
      await service.updateMemberRole(
        req.params.workspaceId,
        getUserId(req),
        req.params.userId,
        req.body.role,
      );

    return sendSuccess(res, {
      member,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await service.removeMember(
      req.params.workspaceId,
      getUserId(req),
      req.params.userId,
    );

    return sendSuccess(res, {
      message:
        "Member removed successfully",
    });
  } catch (error) {
    next(error);
  }
}