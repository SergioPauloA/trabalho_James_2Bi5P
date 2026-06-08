"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { AUTH_COOKIE_KEY, getToken, setToken, clearToken } from "@/utils/auth";
import { appConfig } from "@/services/config";

const AuthContext = createContext(undefined);

const getInitialToken = () => {
  const existingToken = getToken();
  if (existingToken) {
    return existingToken;
  }
  if (appConfig.useMockAuth) {
    const mockToken = appConfig.mockJwtToken;
    setToken(mockToken);
    return mockToken;
  }
  return null;
};

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getInitialToken);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      login: (newToken) => {
        setToken(newToken);
        setTokenState(newToken);
      },
      logout: () => {
        clearToken();
        document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`;
        setTokenState(null);
      },
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
}
