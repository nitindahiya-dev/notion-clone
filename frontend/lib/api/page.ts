import { api } from "./client";

import type {
  Page,
  CreatePageInput,
  UpdatePageInput,
  MovePageInput,
} from "@/types/page";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getPages(
  workspaceId: string,
  parentId?: string | null,
) {
  const response = await api.get<
    ApiResponse<Page[]>
  >(
    `/workspaces/${workspaceId}/pages`,
    {
      params:
        parentId !== undefined
          ? { parentId }
          : undefined,
    },
  );

  return response.data.data;
}

export async function getPage(
  pageId: string,
) {
  const response = await api.get<
    ApiResponse<Page>
  >(`/pages/${pageId}`);

  return response.data.data;
}

export async function createPage(
  workspaceId: string,
  data: CreatePageInput,
) {
  const response = await api.post<
    ApiResponse<Page>
  >(
    `/workspaces/${workspaceId}/pages`,
    data,
  );

  return response.data.data;
}

export async function updatePage(
  pageId: string,
  data: UpdatePageInput,
) {
  const response = await api.patch<
    ApiResponse<Page>
  >(
    `/pages/${pageId}`,
    data,
  );

  return response.data.data;
}

export async function movePage(
  pageId: string,
  data: MovePageInput,
) {
  const response = await api.post<
    ApiResponse<Page>
  >(
    `/pages/${pageId}/move`,
    data,
  );

  return response.data.data;
}

export async function archivePage(
  pageId: string,
) {
  const response = await api.delete<
    ApiResponse<Page>
  >(`/pages/${pageId}`);

  return response.data.data;
}

export async function restorePage(
  pageId: string,
) {
  const response = await api.post<
    ApiResponse<Page>
  >(`/pages/${pageId}/restore`);

  return response.data.data;
}

export async function favoritePage(
  pageId: string,
) {
  const response = await api.post<
    ApiResponse<Page>
  >(`/pages/${pageId}/favorite`);

  return response.data.data;
}

export async function unfavoritePage(
  pageId: string,
) {
  const response = await api.delete<
    ApiResponse<Page>
  >(`/pages/${pageId}/favorite`);

  return response.data.data;
}

export async function getTrash(
  workspaceId: string,
) {
  const response = await api.get<
    ApiResponse<Page[]>
  >(
    `/workspaces/${workspaceId}/pages/trash`,
  );

  return response.data.data;
}