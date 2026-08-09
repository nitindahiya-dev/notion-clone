"use client";

import { create } from "zustand";

import type { Workspace } from "@/types/workspace";

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;

  setWorkspaces: (workspaces: Workspace[]) => void;

  setCurrentWorkspace: (
    workspace: Workspace | null,
  ) => void;

  addWorkspace: (
    workspace: Workspace,
  ) => void;

  updateWorkspace: (
    workspace: Workspace,
  ) => void;

  removeWorkspace: (
    workspaceId: string,
  ) => void;

  setLoading: (
    loading: boolean,
  ) => void;

  reset: () => void;
}

export const useWorkspaceStore =
  create<WorkspaceState>((set) => ({
    workspaces: [],
    currentWorkspace: null,
    isLoading: false,

    setWorkspaces: (workspaces) =>
      set((state) => ({
        workspaces,
        currentWorkspace:
          state.currentWorkspace &&
          workspaces.some(
            (workspace) =>
              workspace.id ===
              state.currentWorkspace?.id,
          )
            ? state.currentWorkspace
            : workspaces[0] ?? null,
      })),

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
        currentWorkspace:
          workspace,
      })),

    updateWorkspace: (workspace) =>
      set((state) => ({
        workspaces:
          state.workspaces.map(
            (item) =>
              item.id === workspace.id
                ? workspace
                : item,
          ),

        currentWorkspace:
          state.currentWorkspace?.id ===
          workspace.id
            ? workspace
            : state.currentWorkspace,
      })),

    removeWorkspace: (
      workspaceId,
    ) =>
      set((state) => {
        const remaining =
          state.workspaces.filter(
            (workspace) =>
              workspace.id !==
              workspaceId,
          );

        return {
          workspaces: remaining,
          currentWorkspace:
            state.currentWorkspace?.id ===
            workspaceId
              ? remaining[0] ?? null
              : state.currentWorkspace,
        };
      }),

    setLoading: (isLoading) =>
      set({
        isLoading,
      }),

    reset: () =>
      set({
        workspaces: [],
        currentWorkspace: null,
        isLoading: false,
      }),
  }));