"use client";

import {
  useAuthStore,
} from "@/stores/auth.store";

export default function DashboardPage() {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user?.email}
        </p>
      </div>
    </main>
  );
}