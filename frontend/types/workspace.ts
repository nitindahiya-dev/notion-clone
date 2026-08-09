import type { WorkspaceRole } from "@prisma/client";

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
}

export interface WorkspaceWithMembership {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  membership: {
    role: WorkspaceRole;
    joinedAt: Date;
  };
}

export type WorkspaceRole =
  | "OWNER"
  | "ADMIN"
  | "MEMBER"
  | "GUEST";

export interface WorkspaceMembership {
  role: WorkspaceRole;
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  membership: WorkspaceMembership;
}

export interface AddWorkspaceMemberInput {
  email: string;
  role?: "ADMIN" | "MEMBER" | "GUEST";
}

export interface WorkspaceMemberResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
  joinedAt: Date;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  joinedAt: string;
}