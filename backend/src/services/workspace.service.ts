import slugify from "slugify";
import { UserRepository } from "../repositories/user.repository";
import type {
  AddWorkspaceMemberInput,
} from "../types/workspace";

import { WorkspaceRepository } from "../repositories/workspace.repository";
import { AppError } from "../utils/app-error";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../types/workspace";

export class WorkspaceService {
  private repository =
    new WorkspaceRepository();

  private userRepository =
    new UserRepository();

  private async generateUniqueSlug(
    name: string,
  ) {
    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug || "workspace";
    let counter = 1;

    while (
      await this.repository.findBySlug(slug)
    ) {
      counter += 1;
      slug = `${baseSlug}-${counter}`;
    }

    return slug;
  }

async createWorkspace(
  userId: string,
  input: CreateWorkspaceInput,
) {
  const slug =
    await this.generateUniqueSlug(
      input.name,
    );

  const workspace =
    await this.repository.createWorkspace({
      name: input.name,
      description: input.description,
      slug,
      userId,
    });

  const membership =
    await this.repository.findUserMembership(
      workspace.id,
      userId,
    );

  if (!membership) {
    throw new AppError(
      "Workspace membership could not be created",
      500,
    );
  }

  return {
    ...workspace,

    membership: {
      role: membership.role,
      joinedAt: membership.joinedAt,
    },
  };
}

  async getUserWorkspaces(
    userId: string,
  ) {
    const memberships =
      await this.repository.findUserWorkspaces(
        userId,
      );

    return memberships.map(
      (membership) => ({
        id: membership.workspace.id,
        name: membership.workspace.name,
        slug: membership.workspace.slug,
        description:
          membership.workspace.description,
        createdAt:
          membership.workspace.createdAt,
        updatedAt:
          membership.workspace.updatedAt,

        membership: {
          role: membership.role,
          joinedAt: membership.joinedAt,
        },
      }),
    );
  }

  async getWorkspace(
    workspaceId: string,
    userId: string,
  ) {
    const membership =
      await this.repository.findUserMembership(
        workspaceId,
        userId,
      );

    if (!membership) {
      throw new AppError(
        "You do not have access to this workspace",
        403,
      );
    }

    const workspace =
      await this.repository.findById(
        workspaceId,
      );

    if (!workspace) {
      throw new AppError(
        "Workspace not found",
        404,
      );
    }

    return {
      ...workspace,
      membership: {
        role: membership.role,
        joinedAt: membership.joinedAt,
      },
    };
  }

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    input: UpdateWorkspaceInput,
  ) {
    await this.requireRole(
      workspaceId,
      userId,
      ["OWNER", "ADMIN"],
    );

    return this.repository.updateWorkspace(
      workspaceId,
      input,
    );
  }

  async deleteWorkspace(
    workspaceId: string,
    userId: string,
  ) {
    await this.requireRole(
      workspaceId,
      userId,
      ["OWNER"],
    );

    return this.repository.deleteWorkspace(
      workspaceId,
    );
  }

  async getMembers(
    workspaceId: string,
    userId: string,
  ) {
    await this.requireRole(
      workspaceId,
      userId,
      [
        "OWNER",
        "ADMIN",
        "MEMBER",
        "GUEST",
      ],
    );

    const members =
      await this.repository.findMembers(
        workspaceId,
      );

    return members.map(
      (member) => ({
        id: member.id,
        userId: member.userId,
        name: member.user.name,
        email: member.user.email,
        role: member.role,
        joinedAt: member.joinedAt,
      }),
    );
  }

  async addMember(
    workspaceId: string,
    requesterId: string,
    input: AddWorkspaceMemberInput,
  ) {
    await this.requireRole(
      workspaceId,
      requesterId,
      ["OWNER", "ADMIN"],
    );

    const user =
      await this.userRepository.findByEmail(
        input.email,
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404,
      );
    }

    const existing =
      await this.repository.findMember(
        workspaceId,
        user.id,
      );

    if (existing) {
      throw new AppError(
        "User is already a member of this workspace",
        409,
      );
    }

    return this.repository.addMember(
      workspaceId,
      user.id,
      input.role ?? "MEMBER",
    );
  }

  async updateMemberRole(
    workspaceId: string,
    requesterId: string,
    userId: string,
    role: "ADMIN" | "MEMBER" | "GUEST",
  ) {
    await this.requireRole(
      workspaceId,
      requesterId,
      ["OWNER"],
    );

    const member =
      await this.repository.findMember(
        workspaceId,
        userId,
      );

    if (!member) {
      throw new AppError(
        "Workspace member not found",
        404,
      );
    }

    if (member.role === "OWNER") {
      throw new AppError(
        "The workspace owner cannot be demoted",
        400,
      );
    }

    return this.repository.updateMemberRole(
      workspaceId,
      userId,
      role,
    );
  }

  async removeMember(
    workspaceId: string,
    requesterId: string,
    userId: string,
  ) {
    await this.requireRole(
      workspaceId,
      requesterId,
      ["OWNER", "ADMIN"],
    );

    const member =
      await this.repository.findMember(
        workspaceId,
        userId,
      );

    if (!member) {
      throw new AppError(
        "Workspace member not found",
        404,
      );
    }

    if (member.role === "OWNER") {
      throw new AppError(
        "The workspace owner cannot be removed",
        400,
      );
    }

    return this.repository.removeMember(
      workspaceId,
      userId,
    );
  }

  async requireRole(
    workspaceId: string,
    userId: string,
    allowedRoles: Array<
      "OWNER" | "ADMIN" | "MEMBER" | "GUEST"
    >,
  ) {
    const membership =
      await this.repository.findUserMembership(
        workspaceId,
        userId,
      );

    if (!membership) {
      throw new AppError(
        "You are not a member of this workspace",
        403,
      );
    }

    if (
      !allowedRoles.includes(
        membership.role,
      )
    ) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    return membership;
  }
}