import apiClient from "./client";

import type {
  Block,
  CreateBlockInput,
  UpdateBlockInput,
} from "@/types/block";

export const blockApi = {
  async list(pageId: string): Promise<Block[]> {
    const response = await apiClient.get(
      `/pages/${pageId}/blocks`,
    );

    return response.data.data;
  },

  async create(
    pageId: string,
    input: CreateBlockInput,
  ): Promise<Block> {
    const response = await apiClient.post(
      `/pages/${pageId}/blocks`,
      input,
    );

    return response.data.data;
  },

  async update(
    blockId: string,
    input: UpdateBlockInput,
  ): Promise<Block> {
    const response = await apiClient.patch(
      `/blocks/${blockId}`,
      input,
    );

    return response.data.data;
  },

  async delete(blockId: string): Promise<Block> {
    const response = await apiClient.delete(
      `/blocks/${blockId}`,
    );

    return response.data.data;
  },
};