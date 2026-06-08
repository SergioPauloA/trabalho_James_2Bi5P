import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { mockDb } from "@/services/mockDb";
import { GroupFiltersInput, GrupoProjeto, GrupoProjetoInput } from "@/types";

const toQueryString = (filters: GroupFiltersInput) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });
  const query = params.toString();
  return query ? `?${query}` : "";
};

export async function getGrupos(filters: GroupFiltersInput): Promise<GrupoProjeto[]> {
  if (appConfig.useMockApi) {
    return mockDb.listGroups(filters);
  }
  return apiRequest<GrupoProjeto[]>(`/grupos-projeto${toQueryString(filters)}`);
}

export async function getGrupoById(id: string): Promise<GrupoProjeto> {
  if (appConfig.useMockApi) {
    return mockDb.getGroupById(id);
  }
  return apiRequest<GrupoProjeto>(`/grupos-projeto/${id}`);
}

export async function createGrupo(input: GrupoProjetoInput): Promise<GrupoProjeto> {
  if (appConfig.useMockApi) {
    return mockDb.createGroup(input);
  }
  return apiRequest<GrupoProjeto>("/grupos-projeto", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateGrupo(id: string, input: GrupoProjetoInput): Promise<GrupoProjeto> {
  if (appConfig.useMockApi) {
    return mockDb.updateGroup(id, input);
  }
  return apiRequest<GrupoProjeto>(`/grupos-projeto/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function canDeleteGrupo(id: string): Promise<{ canDelete: boolean; message?: string }> {
  if (appConfig.useMockApi) {
    return mockDb.canDeleteGroup(id);
  }
  return apiRequest<{ canDelete: boolean; message?: string }>(`/grupos-projeto/${id}/can-delete`);
}

export async function deleteGrupo(id: string): Promise<void> {
  if (appConfig.useMockApi) {
    mockDb.deleteGroup(id);
    return;
  }
  await apiRequest<void>(`/grupos-projeto/${id}`, { method: "DELETE" });
}
