export type WorkspaceRole =
  | "OWNER"
  | "ADMIN"
  | "MEMBER"
  | "GUEST";

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
}

export interface AddWorkspaceMemberInput {
  email: string;
  role?: "ADMIN" | "MEMBER" | "GUEST";
}

export interface UpdateWorkspaceMemberInput {
  role: "ADMIN" | "MEMBER" | "GUEST";
}