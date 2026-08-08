import { api } from "./client";

import type {
  Workspace,
} from "@/types/workspace";

export async function getWorkspaces() {
  const response =
    await api.get<{
      success: boolean;
      data: {
        workspaces: Workspace[];
      };
    }>("/workspaces");

  return response.data;
}

export async function getWorkspace(
  workspaceId: string,
) {
  const response =
    await api.get<{
      success: boolean;
      data: {
        workspace: Workspace;
      };
    }>(
      `/workspaces/${workspaceId}`,
    );

  return response.data;
}

export async function createWorkspace(
  name: string,
  description?: string,
) {
  const response =
    await api.post<{
      success: boolean;
      data: {
        workspace: Workspace;
      };
    }>("/workspaces", {
      name,
      description,
    });

  return response.data;
}

export async function updateWorkspace(
  workspaceId: string,
  data: {
    name?: string;
    description?: string;
  },
) {
  const response =
    await api.patch<{
      success: boolean;
      data: {
        workspace: Workspace;
      };
    }>(
      `/workspaces/${workspaceId}`,
      data,
    );

  return response.data;
}

export async function deleteWorkspace(
  workspaceId: string,
) {
  const response =
    await api.delete<{
      success: boolean;
      data: {
        message: string;
      };
    }>(
      `/workspaces/${workspaceId}`,
    );

  return response.data;
}