export type BlockType =
  | "PARAGRAPH"
  | "HEADING_1"
  | "HEADING_2"
  | "HEADING_3"
  | "BULLETED_LIST"
  | "NUMBERED_LIST"
  | "TODO"
  | "QUOTE"
  | "CODE"
  | "DIVIDER"
  | "IMAGE";

export interface Block {
  id: string;
  pageId: string;
  type: BlockType;
  content: unknown;
  position: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlockInput {
  type?: BlockType;
  content?: unknown;
  position?: number;
}

export interface UpdateBlockInput {
  type?: BlockType;
  content?: unknown;
  position?: number;
}