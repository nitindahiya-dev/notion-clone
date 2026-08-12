// frontend/lib/api/workspace.ts

import { api } from "./client";

import type { Workspace } from "@/types/workspace";

// Define generic response wrapper to reduce repetition
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getWorkspaces() {
  const response = await api.get<ApiResponse<{ workspaces: Workspace[] }>>("/workspaces");
  return response.data;
}

export async function getWorkspace(workspaceId: string) {
  const response = await api.get<ApiResponse<{ workspace: Workspace }>>(`/workspaces/${workspaceId}`);
  return response.data;
}

export async function createWorkspace(name: string, description?: string) {
  const response = await api.post<ApiResponse<{ workspace: Workspace }>>("/workspaces", {
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
  }
) {
  const response = await api.patch<ApiResponse<{ workspace: Workspace }>>(
    `/workspaces/${workspaceId}`,
    data
  );
  return response.data;
}

export async function deleteWorkspace(workspaceId: string) {
  const response = await api.delete<ApiResponse<{ message: string }>>(`/workspaces/${workspaceId}`);
  return response.data;
}