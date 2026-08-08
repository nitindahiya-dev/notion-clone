"use client";

import {
  useEffect,
} from "react";

import {
  getWorkspaces,
} from "@/lib/api/workspace";

import {
  useWorkspaceStore,
} from "@/stores/workspace.store";

export function WorkspaceSwitcher() {
  const {
    workspaces,
    currentWorkspace,
    setWorkspaces,
    setCurrentWorkspace,
    isLoading,
    setLoading,
  } = useWorkspaceStore();

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        setLoading(true);

        const response =
          await getWorkspaces();

        setWorkspaces(
          response.data.workspaces,
        );

        if (
          !currentWorkspace &&
          response.data.workspaces.length
        ) {
          setCurrentWorkspace(
            response.data.workspaces[0],
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadWorkspaces();
  }, [
    setWorkspaces,
    setCurrentWorkspace,
    setLoading,
    currentWorkspace,
  ]);

  if (isLoading) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">
        Loading workspace...
      </div>
    );
  }

  if (!workspaces.length) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">
        No workspaces
      </div>
    );
  }

  return (
    <div className="px-3 py-2">
      <select
        value={
          currentWorkspace?.id ?? ""
        }
        onChange={(event) => {
          const workspace =
            workspaces.find(
              (item) =>
                item.id ===
                event.target.value,
            );

          if (workspace) {
            setCurrentWorkspace(
              workspace,
            );
          }
        }}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
      >
        {workspaces.map(
          (workspace) => (
            <option
              key={workspace.id}
              value={workspace.id}
            >
              {workspace.name}
            </option>
          ),
        )}
      </select>
    </div>
  );
}