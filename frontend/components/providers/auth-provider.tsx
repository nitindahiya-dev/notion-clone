"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  refresh,
} from "@/lib/api/auth";

import {
  useAuthStore,
} from "@/stores/auth.store";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] =
    useState(false);

  const setAuth =
    useAuthStore(
      (state) => state.setAuth,
    );

  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth,
    );

  useEffect(() => {
    setMounted(true);

    async function restoreSession() {
      try {
        const response =
          await refresh();

        setAuth(
          response.data.user,
          response.data.accessToken,
        );
      } catch {
        clearAuth();
      }
    }

    restoreSession();
  }, [setAuth, clearAuth]);

  if (!mounted) {
    return null;
  }

  return children;
}