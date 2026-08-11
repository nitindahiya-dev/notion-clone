import { BlockRepository } from "../repositories/block.repository.js";
import { PageRepository } from "../repositories/page.repository.js";
import { WorkspaceRepository } from "../repositories/workspace.repository.js";
import { AppError } from "../utils/app-error.js";

import type {
  CreateBlockInput,
  UpdateBlockInput,
} from "../types/block.js";

export class BlockService {
  private blockRepository = new BlockRepository();

  private pageRepository = new PageRepository();

  private workspaceRepository =
    new WorkspaceRepository();

  /**
   * Make sure the page exists.
   */
  private async requirePage(pageId: string) {
    const page =
      await this.pageRepository.findById(pageId);

    if (!page) {
      throw new AppError(
        "Page not found",
        404,
      );
    }

    return page;
  }

  /**
   * Make sure the user belongs to
   * the page's workspace.
   */
  private async requirePageAccess(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    const membership =
      await this.workspaceRepository.findUserMembership(
        page.workspaceId,
        userId,
      );

    if (!membership) {
      throw new AppError(
        "You do not have access to this page",
        403,
      );
    }

    return {
      page,
      membership,
    };
  }

  /**
   * Create a block.
   */
  async createBlock(
    pageId: string,
    userId: string,
    input: CreateBlockInput,
  ) {
    const { page } =
      await this.requirePageAccess(
        pageId,
        userId,
      );

    if (page.isArchived) {
      throw new AppError(
        "Cannot add blocks to an archived page",
        400,
      );
    }

    return this.blockRepository.createBlock(
      pageId,
      input,
    );
  }

  /**
   * Get all blocks belonging to a page.
   */
  async listBlocks(
    pageId: string,
    userId: string,
  ) {
    await this.requirePageAccess(
      pageId,
      userId,
    );

    return this.blockRepository
      .findPageBlocks(pageId);
  }

  /**
   * Get one block.
   */
  async getBlock(
    blockId: string,
    userId: string,
  ) {
    const block =
      await this.blockRepository.findById(
        blockId,
      );

    if (!block) {
      throw new AppError(
        "Block not found",
        404,
      );
    }

    await this.requirePageAccess(
      block.pageId,
      userId,
    );

    return block;
  }

  /**
   * Update a block.
   */
  async updateBlock(
    blockId: string,
    userId: string,
    input: UpdateBlockInput,
  ) {
    const block =
      await this.blockRepository.findById(
        blockId,
      );

    if (!block) {
      throw new AppError(
        "Block not found",
        404,
      );
    }

    const { page } =
      await this.requirePageAccess(
        block.pageId,
        userId,
      );

    if (page.isArchived) {
      throw new AppError(
        "Cannot update blocks on an archived page",
        400,
      );
    }

    if (block.isArchived) {
      throw new AppError(
        "Cannot update an archived block",
        400,
      );
    }

    return this.blockRepository.updateBlock(
      blockId,
      input,
    );
  }

  /**
   * Archive a block.
   */
  async archiveBlock(
    blockId: string,
    userId: string,
  ) {
    const block =
      await this.blockRepository.findById(
        blockId,
      );

    if (!block) {
      throw new AppError(
        "Block not found",
        404,
      );
    }

    const { page } =
      await this.requirePageAccess(
        block.pageId,
        userId,
      );

    if (page.isArchived) {
      throw new AppError(
        "Page is already archived",
        400,
      );
    }

    if (block.isArchived) {
      throw new AppError(
        "Block is already archived",
        400,
      );
    }

    return this.blockRepository.archiveBlock(
      blockId,
    );
  }

  /**
   * Restore a block.
   */
  async restoreBlock(
    blockId: string,
    userId: string,
  ) {
    const block =
      await this.blockRepository.findById(
        blockId,
      );

    if (!block) {
      throw new AppError(
        "Block not found",
        404,
      );
    }

    await this.requirePageAccess(
      block.pageId,
      userId,
    );

    if (!block.isArchived) {
      throw new AppError(
        "Block is not archived",
        400,
      );
    }

    return this.blockRepository.restoreBlock(
      blockId,
    );
  }
}