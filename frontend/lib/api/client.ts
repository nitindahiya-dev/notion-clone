// frontend/lib/api/client.ts

import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  useAuthStore,
} from "@/stores/auth.store";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let refreshSubscribers: Array<
  (token: string) => void
> = [];

function subscribeToRefresh(
  callback: (token: string) => void,
) {
  refreshSubscribers.push(callback);
}

function notifyRefreshSubscribers(
  token: string,
) {
  refreshSubscribers.forEach(
    (callback) => callback(token),
  );

  refreshSubscribers = [];
}

api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeToRefresh(
          (token) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            resolve(
              api(originalRequest),
            );
          },
        );
      });
    }

    isRefreshing = true;

    try {
      const response =
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

      const {
        accessToken,
        user,
      } = response.data.data;

      useAuthStore
        .getState()
        .setAuth(
          user,
          accessToken,
        );

      notifyRefreshSubscribers(
        accessToken,
      );

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore
        .getState()
        .clearAuth();

      return Promise.reject(
        refreshError,
      );
    } finally {
      isRefreshing = false;
    }
  },
);