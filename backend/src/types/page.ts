export type PageRole =
  | "OWNER"
  | "ADMIN"
  | "MEMBER"
  | "GUEST";

export interface CreatePageInput {
  title: string;
  parentId?: string | null;
  icon?: string | null;
}

export interface UpdatePageInput {
  title?: string;
  icon?: string | null;
  cover?: string | null;
  parentId?: string | null;
  position?: number;
}

export interface MovePageInput {
  parentId?: string | null;
  position?: number;
}