const getBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) {
    return fallback;
  }
  return value.toLowerCase() === "true";
};

export const appConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  useMockApi: getBoolean(process.env.NEXT_PUBLIC_USE_MOCK_API, true),
  useMockAuth: getBoolean(process.env.NEXT_PUBLIC_USE_MOCK_AUTH, true),
  mockJwtToken: process.env.NEXT_PUBLIC_MOCK_JWT_TOKEN || "mock-jwt-token",
  authStorageKey: process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY || "jwt_token",
};
