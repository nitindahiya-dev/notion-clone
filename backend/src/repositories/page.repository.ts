import { prisma } from "../database/prisma.js";

export class PageRepository {
  async createPage(data: {
    workspaceId: string;
    parentId?: string | null;
    title: string;
    icon?: string | null;
    createdById: string;
    position?: number;
  }) {
    return prisma.page.create({
      data: {
        workspaceId: data.workspaceId,
        parentId: data.parentId ?? null,
        title: data.title,
        icon: data.icon ?? null,
        createdById: data.createdById,
        position: data.position ?? 0,
      },
    });
  }

  async findById(pageId: string) {
    return prisma.page.findUnique({
      where: {
        id: pageId,
      },
    });
  }

  async findByIdWithChildren(pageId: string) {
    return prisma.page.findUnique({
      where: {
        id: pageId,
      },
      include: {
        children: {
          where: {
            isArchived: false,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  }

  async findWorkspacePages(
    workspaceId: string,
    parentId?: string | null,
  ) {
    return prisma.page.findMany({
      where: {
        workspaceId,
        parentId: parentId ?? null,
        isArchived: false,
      },
      orderBy: [
        {
          position: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  async findAllWorkspacePages(
    workspaceId: string,
  ) {
    return prisma.page.findMany({
      where: {
        workspaceId,
        isArchived: false,
      },
      orderBy: [
        {
          position: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  async updatePage(
    pageId: string,
    data: {
      title?: string;
      icon?: string | null;
      cover?: string | null;
      position?: number;
      parentId?: string | null;
    },
  ) {
    return prisma.page.update({
      where: {
        id: pageId,
      },
      data,
    });
  }

  async archivePage(pageId: string) {
    return prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async restorePage(pageId: string) {
    return prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        isArchived: false,
      },
    });
  }

  async favoritePage(pageId: string) {
    return prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        isFavorite: true,
      },
    });
  }

  async unfavoritePage(pageId: string) {
    return prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        isFavorite: false,
      },
    });
  }

  async findArchivedPages(
    workspaceId: string,
  ) {
    return prisma.page.findMany({
      where: {
        workspaceId,
        isArchived: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }
}