import { create } from "zustand";

import type {
  Workspace,
} from "@/types/workspace";

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;

  setWorkspaces: (
    workspaces: Workspace[],
  ) => void;

  setCurrentWorkspace: (
    workspace: Workspace | null,
  ) => void;

  addWorkspace: (
    workspace: Workspace,
  ) => void;

  removeWorkspace: (
    workspaceId: string,
  ) => void;

  setLoading: (
    loading: boolean,
  ) => void;
}

export const useWorkspaceStore =
  create<WorkspaceState>((set) => ({
    workspaces: [],
    currentWorkspace: null,
    isLoading: false,

    setWorkspaces: (workspaces) =>
      set({
        workspaces,
      }),

    setCurrentWorkspace: (
      currentWorkspace,
    ) =>
      set({
        currentWorkspace,
      }),

    addWorkspace: (workspace) =>
      set((state) => ({
        workspaces: [
          ...state.workspaces,
          workspace,
        ],
      })),

    removeWorkspace: (
      workspaceId,
    ) =>
      set((state) => ({
        workspaces:
          state.workspaces.filter(
            (workspace) =>
              workspace.id !==
              workspaceId,
          ),

        currentWorkspace:
          state.currentWorkspace?.id ===
          workspaceId
            ? null
            : state.currentWorkspace,
      })),

    setLoading: (isLoading) =>
      set({
        isLoading,
      }),
  }));