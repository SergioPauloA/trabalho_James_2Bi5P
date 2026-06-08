import { appConfig } from "@/services/config";

export const AUTH_COOKIE_KEY = "auth_token";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(appConfig.authStorageKey || "jwt_token");
};

export const setToken = (token: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(appConfig.authStorageKey || "jwt_token", token);
  document.cookie = `${AUTH_COOKIE_KEY}=${token}; path=/; max-age=86400`;
};

export const clearToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(appConfig.authStorageKey || "jwt_token");
};
