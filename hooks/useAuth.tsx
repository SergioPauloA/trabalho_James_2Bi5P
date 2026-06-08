"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { AUTH_COOKIE_KEY, getToken, setToken, clearToken } from "@/utils/auth";
import { appConfig } from "@/services/config";

type AuthContextData = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getInitialToken);

  const value = useMemo<AuthContextData>(
    () => ({
      token,
      isAuthenticated: !!token,
      login: (newToken: string) => {
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
