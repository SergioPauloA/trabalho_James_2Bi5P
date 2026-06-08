import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { AvaliacaoInput } from "@/types";
import { mockDb } from "@/services/mockDb";

export async function saveAvaliacao(input: AvaliacaoInput): Promise<void> {
  if (appConfig.useMockApi) {
    mockDb.saveAvaliacao(input);
    return;
  }
  await apiRequest<void>("/avaliacoes", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
