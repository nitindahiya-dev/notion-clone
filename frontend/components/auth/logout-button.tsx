"use client";

import {
  useRouter,
} from "next/navigation";

import {
  logout,
} from "@/lib/api/auth";

import {
  useAuthStore,
} from "@/stores/auth.store";

export function LogoutButton() {
  const router = useRouter();

  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth,
    );

  async function handleLogout() {
    try {
      await logout();
    } finally {
      clearAuth();
      router.replace("/login");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border px-4 py-2 text-sm"
    >
      Sign out
    </button>
  );
}