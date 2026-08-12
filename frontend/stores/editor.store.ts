import { create } from "zustand";

import type {
  Block,
  CreateBlockInput,
  UpdateBlockInput,
} from "@/types/block";

interface EditorStore {
  blocks: Block[];
  activeBlockId: string | null;
  isLoading: boolean;
  isSaving: boolean;

  setBlocks: (blocks: Block[]) => void;

  addBlock: (block: Block) => void;

  updateBlock: (
    blockId: string,
    data: UpdateBlockInput,
  ) => void;

  removeBlock: (blockId: string) => void;

  setActiveBlock: (blockId: string | null) => void;

  setLoading: (value: boolean) => void;

  setSaving: (value: boolean) => void;

  reset: () => void;
}

export const useEditorStore = create<EditorStore>(
  (set) => ({
    blocks: [],
    activeBlockId: null,
    isLoading: false,
    isSaving: false,

    setBlocks: (blocks) =>
      set({
        blocks,
      }),

    addBlock: (block) =>
      set((state) => ({
        blocks: [...state.blocks, block],
      })),

    updateBlock: (blockId, data) =>
      set((state) => ({
        blocks: state.blocks.map((block) =>
          block.id === blockId
            ? {
                ...block,
                ...data,
              }
            : block,
        ),
      })),

    removeBlock: (blockId) =>
      set((state) => ({
        blocks: state.blocks.filter(
          (block) => block.id !== blockId,
        ),
      })),

    setActiveBlock: (blockId) =>
      set({
        activeBlockId: blockId,
      }),

    setLoading: (value) =>
      set({
        isLoading: value,
      }),

    setSaving: (value) =>
      set({
        isSaving: value,
      }),

    reset: () =>
      set({
        blocks: [],
        activeBlockId: null,
        isLoading: false,
        isSaving: false,
      }),
  }),
);