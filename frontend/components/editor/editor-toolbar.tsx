import { create } from "zustand";

import type {
  Block,
  BlockType,
} from "@/types/block";

interface EditorState {
  blocks: Block[];
  activeBlockId: string | null;
  isLoading: boolean;
  isSaving: boolean;

  setBlocks: (blocks: Block[]) => void;

  addBlock: (
    block: Block,
    index?: number,
  ) => void;

  updateBlock: (
    blockId: string,
    updates: Partial<Block>,
  ) => void;

  removeBlock: (
    blockId: string,
  ) => void;

  setActiveBlock: (
    blockId: string | null,
  ) => void;

  setLoading: (
    value: boolean,
  ) => void;

  setSaving: (
    value: boolean,
  ) => void;

  clear: () => void;
}

export const useEditorStore =
  create<EditorState>((set) => ({
    blocks: [],
    activeBlockId: null,
    isLoading: false,
    isSaving: false,

    setBlocks: (blocks) =>
      set({
        blocks,
      }),

    addBlock: (block, index) =>
      set((state) => {
        if (
          index === undefined ||
          index >= state.blocks.length
        ) {
          return {
            blocks: [
              ...state.blocks,
              block,
            ],
          };
        }

        const blocks = [
          ...state.blocks,
        ];

        blocks.splice(index, 0, block);

        return {
          blocks,
        };
      }),

    updateBlock: (
      blockId,
      updates,
    ) =>
      set((state) => ({
        blocks: state.blocks.map(
          (block) =>
            block.id === blockId
              ? {
                  ...block,
                  ...updates,
                }
              : block,
        ),
      })),

    removeBlock: (blockId) =>
      set((state) => ({
        blocks: state.blocks.filter(
          (block) =>
            block.id !== blockId,
        ),
      })),

    setActiveBlock: (
      blockId,
    ) =>
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

    clear: () =>
      set({
        blocks: [],
        activeBlockId: null,
        isLoading: false,
        isSaving: false,
      }),
  }));