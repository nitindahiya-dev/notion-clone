import type { Block } from "./block";

export interface Page {
  id: string;
  workspaceId: string;
  parentId: string | null;

  title: string;
  icon: string | null;
  cover: string | null;

  position: number;

  isFavorite: boolean;
  isArchived: boolean;

  createdById: string;

  createdAt: string;
  updatedAt: string;

  blocks?: Block[];
}

export interface CreatePageInput {
  title: string;
  parentId?: string | null;
  icon?: string | null;
  cover?: string | null;
  position?: number;
}

export interface UpdatePageInput {
  title?: string;
  parentId?: string | null;
  icon?: string | null;
  cover?: string | null;
  position?: number;
  isFavorite?: boolean;
}

export interface MovePageInput {
  parentId?: string | null;
  position?: number;
}