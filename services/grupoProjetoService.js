import { apiRequest } from "@/services/http";
import { appConfig } from "@/services/config";
import { mockDb } from "@/services/mockDb";

const toQueryString = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });
  const query = params.toString();
  return query ? `?${query}` : "";
};

export async function getGrupos(filters) {
  if (appConfig.useMockApi) {
    return mockDb.listGroups(filters);
  }
  return apiRequest(`/grupos-projeto${toQueryString(filters)}`);
}

export async function getGrupoById(id) {
  if (appConfig.useMockApi) {
    return mockDb.getGroupById(id);
  }
  return apiRequest(`/grupos-projeto/${id}`);
}

export async function createGrupo(input) {
  if (appConfig.useMockApi) {
    return mockDb.createGroup(input);
  }
  return apiRequest("/grupos-projeto", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateGrupo(id, input) {
  if (appConfig.useMockApi) {
    return mockDb.updateGroup(id, input);
  }
  return apiRequest(`/grupos-projeto/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function canDeleteGrupo(id) {
  if (appConfig.useMockApi) {
    return mockDb.canDeleteGroup(id);
  }
  return apiRequest(`/grupos-projeto/${id}/can-delete`);
}

export async function deleteGrupo(id) {
  if (appConfig.useMockApi) {
    mockDb.deleteGroup(id);
    return;
  }
  await apiRequest(`/grupos-projeto/${id}`, { method: "DELETE" });
}
