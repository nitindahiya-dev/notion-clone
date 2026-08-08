"use client";

import {
  useState,
} from "react";

import {
  updateWorkspace,
} from "@/lib/api/workspace";

import type {
  Workspace,
} from "@/types/workspace";

interface WorkspaceSettingsProps {
  workspace: Workspace;
  onUpdated?: (
    workspace: Workspace,
  ) => void;
}

export function WorkspaceSettings({
  workspace,
  onUpdated,
}: WorkspaceSettingsProps) {
  const [
    name,
    setName,
  ] = useState(workspace.name);

  const [
    description,
    setDescription,
  ] = useState(
    workspace.description ?? "",
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const canEdit =
    workspace.membership.role ===
      "OWNER" ||
    workspace.membership.role ===
      "ADMIN";

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      const response =
        await updateWorkspace(
          workspace.id,
          {
            name,
            description,
          },
        );

      onUpdated?.(
        response.data.workspace,
      );
    } finally {
      setLoading(false);
    }
  }

  if (!canEdit) {
    return (
      <p className="text-sm text-muted-foreground">
        You don't have permission to
        modify this workspace.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        className="w-full rounded-md border px-3 py-2"
      />

      <textarea
        value={description}
        onChange={(event) =>
          setDescription(
            event.target.value,
          )
        }
        className="min-h-24 w-full rounded-md border px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        {loading
          ? "Saving..."
          : "Save changes"}
      </button>
    </form>
  );
}