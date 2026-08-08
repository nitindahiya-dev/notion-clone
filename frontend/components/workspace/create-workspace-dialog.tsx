"use client";

import {
  useState,
} from "react";

import {
  createWorkspace,
} from "@/lib/api/workspace";

import {
  useWorkspaceStore,
} from "@/stores/workspace.store";

export function CreateWorkspaceDialog() {
  const [
    name,
    setName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const addWorkspace =
    useWorkspaceStore(
      (state) => state.addWorkspace,
    );

  const setCurrentWorkspace =
    useWorkspaceStore(
      (state) =>
        state.setCurrentWorkspace,
    );

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await createWorkspace(
          name,
          description || undefined,
        );

      const workspace =
        response.data.workspace;

      addWorkspace(workspace);

      setCurrentWorkspace(
        workspace,
      );

      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-5"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Create workspace
        </h2>

        <p className="text-sm text-muted-foreground">
          Create a workspace for your
          projects and ideas.
        </p>
      </div>

      <input
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="Workspace name"
        className="w-full rounded-md border px-3 py-2"
      />

      <textarea
        value={description}
        onChange={(event) =>
          setDescription(
            event.target.value,
          )
        }
        placeholder="Description (optional)"
        className="min-h-24 w-full rounded-md border px-3 py-2"
      />

      <button
        disabled={loading}
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        {loading
          ? "Creating..."
          : "Create workspace"}
      </button>
    </form>
  );
}