import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { mockDb } from "@/services/mockDb";

export async function getCatalogs() {
  if (appConfig.useMockApi) {
    return mockDb.getCatalogs();
  }
  return apiRequest("/catalogos");
}
