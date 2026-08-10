import type {
  WorkspaceRole,
} from "@prisma/client";

import { PageRepository } from "../repositories/page.repository.js";
import { WorkspaceRepository } from "../repositories/workspace.repository.js";
import { AppError } from "../utils/app-error.js";

import type {
  CreatePageInput,
  UpdatePageInput,
  MovePageInput,
} from "../types/page.js";

export class PageService {
  private pageRepository = new PageRepository();

  private workspaceRepository =
    new WorkspaceRepository();

  /**
   * Check whether a user belongs to a workspace
   * and optionally verify their role.
   */
  private async requireWorkspaceAccess(
    workspaceId: string,
    userId: string,
    allowedRoles?: WorkspaceRole[],
  ) {
    const membership =
      await this.workspaceRepository.findUserMembership(
        workspaceId,
        userId,
      );

    if (!membership) {
      throw new AppError(
        "You do not have access to this workspace",
        403,
      );
    }

    if (
      allowedRoles &&
      !allowedRoles.includes(membership.role)
    ) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    return membership;
  }

  /**
   * Make sure the page exists and belongs
   * to the expected workspace.
   */
  private async requirePage(
    pageId: string,
    workspaceId?: string,
  ) {
    const page =
      await this.pageRepository.findById(pageId);

    if (!page) {
      throw new AppError(
        "Page not found",
        404,
      );
    }

    if (
      workspaceId &&
      page.workspaceId !== workspaceId
    ) {
      throw new AppError(
        "Page does not belong to this workspace",
        403,
      );
    }

    return page;
  }

  /**
   * Validate a parent page.
   */
  private async validateParent(
    parentId: string | null | undefined,
    workspaceId: string,
    pageId?: string,
  ) {
    if (!parentId) {
      return null;
    }

    if (pageId && parentId === pageId) {
      throw new AppError(
        "A page cannot be its own parent",
        400,
      );
    }

    const parent =
      await this.pageRepository.findById(
        parentId,
      );

    if (!parent) {
      throw new AppError(
        "Parent page not found",
        404,
      );
    }

    if (
      parent.workspaceId !== workspaceId
    ) {
      throw new AppError(
        "Parent page must belong to the same workspace",
        400,
      );
    }

    if (parent.isArchived) {
      throw new AppError(
        "An archived page cannot be used as a parent",
        400,
      );
    }

    return parent;
  }

  /**
   * Check whether moving a page below
   * a parent would create a circular hierarchy.
   *
   * Example:
   *
   * A
   * └── B
   *     └── C
   *
   * Moving A under C would create:
   *
   * A → B → C → A ❌
   */
  private async preventCircularHierarchy(
    pageId: string,
    parentId: string | null | undefined,
  ) {
    if (!parentId) {
      return;
    }

    let currentId:
      | string
      | null = parentId;

    while (currentId) {
      if (currentId === pageId) {
        throw new AppError(
          "Cannot move a page inside its own descendant",
          400,
        );
      }

      const current =
        await this.pageRepository.findById(
          currentId,
        );

      if (!current) {
        break;
      }

      currentId = current.parentId;
    }
  }

  /**
   * Create a new page.
   */
  async createPage(
    workspaceId: string,
    userId: string,
    input: CreatePageInput,
  ) {
    await this.requireWorkspaceAccess(
      workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    await this.validateParent(
      input.parentId,
      workspaceId,
    );

    return this.pageRepository.createPage({
      workspaceId,
      createdById: userId,
      title: input.title,
      ...(input.parentId !== undefined && {
        parentId: input.parentId,
      }),
      ...(input.icon !== undefined && {
        icon: input.icon,
      }),
    });
  }

  /**
   * Get a single page.
   */
  async getPage(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
        "GUEST",
      ],
    );

    return this.pageRepository
      .findByIdWithChildren(pageId);
  }

  /**
   * List pages directly under a parent.
   *
   * parentId = null → root pages
   */
  async listPages(
    workspaceId: string,
    userId: string,
    parentId?: string | null,
  ) {
    await this.requireWorkspaceAccess(
      workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
        "GUEST",
      ],
    );

    if (parentId) {
      await this.validateParent(
        parentId,
        workspaceId,
      );
    }

    return this.pageRepository
      .findWorkspacePages(
        workspaceId,
        parentId,
      );
  }

  /**
   * Update page metadata.
   */
  async updatePage(
    pageId: string,
    userId: string,
    input: UpdatePageInput,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    if (
      input.parentId !== undefined
    ) {
      await this.validateParent(
        input.parentId,
        page.workspaceId,
        pageId,
      );

      await this.preventCircularHierarchy(
        pageId,
        input.parentId,
      );
    }

    return this.pageRepository.updatePage(
      pageId,
      input,
    );
  }

  /**
   * Move a page to another parent.
   */
  async movePage(
    pageId: string,
    userId: string,
    input: MovePageInput,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    await this.validateParent(
      input.parentId,
      page.workspaceId,
      pageId,
    );

    await this.preventCircularHierarchy(
      pageId,
      input.parentId,
    );

    return this.pageRepository.updatePage(
      pageId,
      {
        ...(input.parentId !== undefined && {
          parentId: input.parentId,
        }),
        ...(input.position !== undefined && {
          position: input.position,
        }),
      },
    );
  }

  /**
   * Archive a page.
   */
  async archivePage(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    if (page.isArchived) {
      throw new AppError(
        "Page is already archived",
        400,
      );
    }

    return this.pageRepository.archivePage(
      pageId,
    );
  }

  /**
   * Restore an archived page.
   */
  async restorePage(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    if (!page.isArchived) {
      throw new AppError(
        "Page is not archived",
        400,
      );
    }

    if (page.parentId) {
      await this.validateParent(
        page.parentId,
        page.workspaceId,
        page.id,
      );
    }

    return this.pageRepository.restorePage(
      pageId,
    );
  }

  /**
   * Add page to favorites.
   */
  async favoritePage(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    if (page.isArchived) {
      throw new AppError(
        "Archived pages cannot be favorited",
        400,
      );
    }

    return this.pageRepository.favoritePage(
      pageId,
    );
  }

  /**
   * Remove page from favorites.
   */
  async unfavoritePage(
    pageId: string,
    userId: string,
  ) {
    const page =
      await this.requirePage(pageId);

    await this.requireWorkspaceAccess(
      page.workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    return this.pageRepository.unfavoritePage(
      pageId,
    );
  }

  /**
   * List archived pages.
   */
  async listTrash(
    workspaceId: string,
    userId: string,
  ) {
    await this.requireWorkspaceAccess(
      workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
      ],
    );

    return this.pageRepository
      .findArchivedPages(workspaceId);
  }
}