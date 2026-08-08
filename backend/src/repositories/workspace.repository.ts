import { prisma } from "../database/prisma";
import type { WorkspaceRole } from "@prisma/client";

export class WorkspaceRepository {
  async createWorkspace(data: {
    name: string;
    slug: string;
    description?: string;
    userId: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: data.userId,
          role: "OWNER",
        },
      });

      return workspace;
    });
  }

  async findById(workspaceId: string) {
    return prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.workspace.findUnique({
      where: {
        slug,
      },
    });
  }

  async findUserMembership(
    workspaceId: string,
    userId: string,
  ) {
    return prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId,
        },
      },
    });
  }

  async findUserWorkspaces(userId: string) {
    return prisma.workspaceMember.findMany({
      where: {
        userId,
      },
      include: {
        workspace: true,
      },
      orderBy: {
        joinedAt: "asc",
      },
    });
  }

  async updateWorkspace(
    workspaceId: string,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    return prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data,
    });
  }

  async deleteWorkspace(
    workspaceId: string,
  ) {
    return prisma.workspace.delete({
      where: {
        id: workspaceId,
      },
    });
  }

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    role: WorkspaceRole,
  ) {
    return prisma.workspaceMember.update({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId,
        },
      },
      data: {
        role,
      },
    });
  }
}