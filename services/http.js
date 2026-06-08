import { appConfig } from "@/services/config";
import { getToken } from "@/utils/auth";

const buildHeaders = (customHeaders) => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {}),
    ...customHeaders,
  };
};

export async function apiRequest(path, init) {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...init,
    headers: buildHeaders(init?.headers),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro de integração com API");
  }

  if (response.status === 204) {
    return undefined;
  }

  return response.json();
}
