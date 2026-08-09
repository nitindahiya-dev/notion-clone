"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  const [
    open,
    setOpen,
  ] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const response =
          await getWorkspaces();

        setWorkspaces(
          response.data.workspaces,
        );
      } catch (error) {
        console.error(
          "Failed to load workspaces:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    setLoading,
    setWorkspaces,
  ]);

  if (isLoading) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="px-3 py-2 text-sm">
        No workspace
      </div>
    );
  }

  return (
    <div className="relative px-3 py-2">
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-muted"
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            {currentWorkspace.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <span className="truncate text-sm font-medium">
            {currentWorkspace.name}
          </span>
        </div>

        <span className="text-xs">
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full z-50 mt-1 rounded-md border bg-background p-1 shadow-lg">
          {workspaces.map(
            (workspace) => (
              <button
                key={workspace.id}
                type="button"
                onClick={() => {
                  setCurrentWorkspace(
                    workspace,
                  );
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                  {workspace.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <span className="truncate">
                  {workspace.name}
                </span>
              </button>
            ),
          )}

          <div className="my-1 border-t" />

          <Link
            href="/dashboard/workspace/new"
            onClick={() =>
              setOpen(false)
            }
            className="block rounded-md px-2 py-2 text-sm hover:bg-muted"
          >
            + Create workspace
          </Link>
        </div>
      )}
    </div>
  );
}