import { Router } from "express";

import {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller";

import { requireAuth } from "../middlewares/auth.middleware";

import {
  requireWorkspaceMember,
  requireWorkspaceRole,
} from "../middlewares/workspace.middleware";

import { validate } from "../middlewares/validate.middleware";

import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "../validators/workspace.validator";

const router = Router();

/*
 * Workspace collection
 */

router.get(
  "/",
  requireAuth,
  getWorkspaces,
);

router.post(
  "/",
  requireAuth,
  validate(createWorkspaceSchema),
  createWorkspace,
);

/*
 * Individual workspace
 */

router.get(
  "/:workspaceId",
  requireAuth,
  requireWorkspaceMember,
  getWorkspace,
);

router.patch(
  "/:workspaceId",
  requireAuth,
  requireWorkspaceMember,
  requireWorkspaceRole(
    "OWNER",
    "ADMIN",
  ),
  validate(updateWorkspaceSchema),
  updateWorkspace,
);

router.delete(
  "/:workspaceId",
  requireAuth,
  requireWorkspaceMember,
  requireWorkspaceRole("OWNER"),
  deleteWorkspace,
);

export default router;