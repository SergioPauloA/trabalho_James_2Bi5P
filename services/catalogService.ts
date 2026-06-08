import { CatalogData } from "@/types";
import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { mockDb } from "@/services/mockDb";

export async function getCatalogs(): Promise<CatalogData> {
  if (appConfig.useMockApi) {
    return mockDb.getCatalogs();
  }
  return apiRequest<CatalogData>("/catalogos");
}
