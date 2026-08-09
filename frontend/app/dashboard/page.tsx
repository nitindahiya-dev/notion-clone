"use client";

import {
  WorkspaceSwitcher,
} from "@/components/workspace/workspace-switcher";

import {
  CreateWorkspaceDialog,
} from "@/components/workspace/create-workspace-dialog";

import {
  useWorkspaceStore,
} from "@/stores/workspace.store";

export default function DashboardPage() {
  const currentWorkspace =
    useWorkspaceStore(
      (state) =>
        state.currentWorkspace,
    );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r">
        <div className="border-b p-4">
          <div className="text-lg font-bold">
            Notion Clone
          </div>
        </div>

        <WorkspaceSwitcher />

        <nav className="space-y-1 px-3 py-4">
          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            🏠 Home
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            🔍 Search
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            ⭐ Favorites
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            🗑 Trash
          </button>
        </nav>

        <div className="px-6 py-2 text-xs font-semibold uppercase text-muted-foreground">
          Pages
        </div>

        <div className="px-3">
          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            📄 Getting Started
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            📄 Projects
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            📄 Ideas
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="text-sm text-muted-foreground">
            Workspace
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
              N
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl p-10">
          {!currentWorkspace ? (
            <CreateWorkspaceDialog />
          ) : (
            <>
              <div className="mb-10">
                <p className="mb-2 text-sm text-muted-foreground">
                  Your workspace
                </p>

                <h1 className="text-4xl font-bold">
                  {currentWorkspace.name}
                </h1>

                {currentWorkspace.description && (
                  <p className="mt-3 text-muted-foreground">
                    {
                      currentWorkspace.description
                    }
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-5">
                  <div className="text-2xl font-bold">
                    0
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Pages
                  </div>
                </div>

                <div className="rounded-lg border p-5">
                  <div className="text-2xl font-bold">
                    0
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Favorites
                  </div>
                </div>

                <div className="rounded-lg border p-5">
                  <div className="text-2xl font-bold">
                    {currentWorkspace.membership.role}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Your role
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-lg border p-8">
                <h2 className="text-xl font-semibold">
                  Welcome to your workspace 👋
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Your Notion clone is now
                  connected to PostgreSQL.
                </p>

                <button className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                  + New Page
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}