import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma.js";

import type {
  CreateBlockInput,
  UpdateBlockInput,
} from "../types/block.js";

export class BlockRepository {
  async createBlock(
    pageId: string,
    input: CreateBlockInput,
  ) {
    return prisma.block.create({
      data: {
        pageId,
        type: input.type ?? "PARAGRAPH",

        ...(input.content !== undefined && {
          content:
            input.content === null
              ? Prisma.JsonNull
              : (input.content as Prisma.InputJsonValue),
        }),

        position: input.position ?? 0,
      },
    });
  }

  async findById(blockId: string) {
    return prisma.block.findUnique({
      where: {
        id: blockId,
      },
    });
  }

  async findPageBlocks(pageId: string) {
    return prisma.block.findMany({
      where: {
        pageId,
        isArchived: false,
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  async updateBlock(
    blockId: string,
    input: UpdateBlockInput,
  ) {
    return prisma.block.update({
      where: {
        id: blockId,
      },
      data: {
        ...(input.type !== undefined && {
          type: input.type,
        }),

        ...(input.content !== undefined && {
          content:
            input.content === null
              ? Prisma.JsonNull
              : (input.content as Prisma.InputJsonValue),
        }),

        ...(input.position !== undefined && {
          position: input.position,
        }),
      },
    });
  }

  async archiveBlock(blockId: string) {
    return prisma.block.update({
      where: {
        id: blockId,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async restoreBlock(blockId: string) {
    return prisma.block.update({
      where: {
        id: blockId,
      },
      data: {
        isArchived: false,
      },
    });
  }
}