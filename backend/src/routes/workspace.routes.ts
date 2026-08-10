import { Router } from "express";

import {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getMembers,
  addMember,
  updateMemberRole,
  removeMember,
} from "../controllers/workspace.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

import {
  requireWorkspaceMember,
  requireWorkspaceRole,
} from "../middlewares/workspace.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  addWorkspaceMemberSchema,
  updateWorkspaceMemberSchema,
} from "../validators/workspace.validator.js";

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
 * IMPORTANT:
 * Member routes come before /:workspaceId
 */

router.get(
  "/:workspaceId/members",
  requireAuth,
  requireWorkspaceMember,
  getMembers,
);

router.post(
  "/:workspaceId/members",
  requireAuth,
  requireWorkspaceMember,
  requireWorkspaceRole(
    "OWNER",
    "ADMIN",
  ),
  validate(addWorkspaceMemberSchema),
  addMember,
);

router.patch(
  "/:workspaceId/members/:userId",
  requireAuth,
  requireWorkspaceMember,
  requireWorkspaceRole("OWNER"),
  validate(updateWorkspaceMemberSchema),
  updateMemberRole,
);

router.delete(
  "/:workspaceId/members/:userId",
  requireAuth,
  requireWorkspaceMember,
  requireWorkspaceRole(
    "OWNER",
    "ADMIN",
  ),
  removeMember,
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