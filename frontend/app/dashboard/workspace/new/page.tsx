"use client";

import { useRouter } from "next/navigation";

import {
  CreateWorkspaceDialog,
} from "@/components/workspace/create-workspace-dialog";

export default function NewWorkspacePage() {
  const router =
    useRouter();

  return (
    <div className="mx-auto max-w-2xl p-10">
      <button
        type="button"
        onClick={() =>
          router.back()
        }
        className="mb-8 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </button>

      <CreateWorkspaceDialog />
    </div>
  );
}