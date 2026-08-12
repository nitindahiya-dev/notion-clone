import { api } from "./client";

import type {
  Block,
  CreateBlockInput,
  UpdateBlockInput,
} from "@/types/block";

export const blockApi = {
  async list(pageId: string): Promise<Block[]> {
    const response = await api.get(
      `/pages/${pageId}/blocks`,
    );

    return response.data.data;
  },

  async create(
    pageId: string,
    input: CreateBlockInput,
  ): Promise<Block> {
    const response = await api.post(
      `/pages/${pageId}/blocks`,
      input,
    );

    return response.data.data;
  },

  async get(blockId: string): Promise<Block> {
    const response = await api.get(
      `/blocks/${blockId}`,
    );

    return response.data.data;
  },

  async update(
    blockId: string,
    input: UpdateBlockInput,
  ): Promise<Block> {
    const response = await api.patch(
      `/blocks/${blockId}`,
      input,
    );

    return response.data.data;
  },

  async delete(blockId: string): Promise<Block> {
    const response = await api.delete(
      `/blocks/${blockId}`,
    );

    return response.data.data;
  },

  async restore(blockId: string): Promise<Block> {
    const response = await api.post(
      `/blocks/${blockId}/restore`,
    );

    return response.data.data;
  },
};