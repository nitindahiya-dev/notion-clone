import type { Block, BlockType } from "./block";

export interface EditorState {
  blocks: Block[];
  activeBlockId: string | null;
  isLoading: boolean;
  isSaving: boolean;
}

export interface AddBlockInput {
  type?: BlockType;
  content?: unknown;
  position?: number;
}