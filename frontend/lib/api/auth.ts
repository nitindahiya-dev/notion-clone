import { api } from "./client";

import type {
  AuthUser,
} from "@/stores/auth.store";

interface AuthResponse {
  success: boolean;

  data: {
    user: AuthUser;
    accessToken: string;
  };
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      "/auth/login",
      {
        email,
        password,
      },
    );

  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      "/auth/register",
      {
        name,
        email,
        password,
      },
    );

  return response.data;
}

export async function refresh() {
  const response =
    await api.post<AuthResponse>(
      "/auth/refresh",
    );

  return response.data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function getMe() {
  const response =
    await api.get<{
      success: boolean;
      data: {
        user: AuthUser;
      };
    }>("/auth/me");

  return response.data;
}