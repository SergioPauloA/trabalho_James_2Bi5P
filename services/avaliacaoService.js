import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { mockDb } from "@/services/mockDb";

export async function saveAvaliacao(input) {
  if (appConfig.useMockApi) {
    mockDb.saveAvaliacao(input);
    return;
  }
  await apiRequest("/avaliacoes", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
