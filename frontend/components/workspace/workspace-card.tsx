"use client";

import type {
  Workspace,
} from "@/types/workspace";

interface WorkspaceCardProps {
  workspace: Workspace;
  onSelect?: (
    workspace: Workspace,
  ) => void;
}

export function WorkspaceCard({
  workspace,
  onSelect,
}: WorkspaceCardProps) {
  return (
    <button
      type="button"
      onClick={() =>
        onSelect?.(workspace)
      }
      className="w-full rounded-lg border p-4 text-left transition hover:bg-muted"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-semibold">
          {workspace.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-medium">
            {workspace.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {workspace.membership.role}
          </p>
        </div>
      </div>
    </button>
  );
}