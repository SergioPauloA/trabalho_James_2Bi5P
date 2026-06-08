"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { GroupFilters } from "@/components/task3/GroupFilters";
import { GroupTable } from "@/components/task3/GroupTable";
import { GrupoProjeto, GroupFiltersInput } from "@/types";
import { canDeleteGrupo, deleteGrupo, getGrupos } from "@/services/grupoProjetoService";
import { getErrorMessage } from "@/utils/errors";

const initialFilters: GroupFiltersInput = {
  aluno: "",
  professorId: "",
  turmaId: "",
  cursoId: "",
  periodoLetivoId: "",
};

export default function GruposPage() {
  const [groups, setGroups] = useState<GrupoProjeto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<GroupFiltersInput>(initialFilters);

  const loadData = useCallback(async (activeFilters: GroupFiltersInput, showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setError("");
    }
    try {
      const result = await getGrupos(activeFilters);
      setGroups(result);
    } catch (error) {
      setError(getErrorMessage(error, "Não foi possível carregar os grupos de projeto."));
    } finally {
      setLoading(false);
    }
  }, []);

  const hasActiveFilters = useMemo(() => Object.values(filters).some(Boolean), [filters]);

  const handleFilter = async () => {
    await loadData(filters);
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      const check = await canDeleteGrupo(id);
      if (!check.canDelete) {
        setError(check.message || "Não é possível excluir o grupo pois existe projeto vinculado.");
        return;
      }
      const confirmed = window.confirm("Deseja realmente excluir este grupo?");
      if (!confirmed) {
        return;
      }
      await deleteGrupo(id);
      await loadData(filters);
    } catch (error) {
      setError(getErrorMessage(error, "Erro ao excluir grupo."));
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    loadData(initialFilters);
  };

  return (
    <section className="card">
      <div className="header-row">
        <h1>Grupos de Projeto</h1>
        <Link href="/task-3/grupos/novo" className="button-link">Novo grupo</Link>
      </div>
      <GroupFilters filters={filters} onChange={setFilters} onFilter={handleFilter} onClear={clearFilters} />
      {hasActiveFilters && <p className="muted">Filtros ativos aplicados à listagem.</p>}
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && <GroupTable groups={groups} onDelete={handleDelete} />}
    </section>
  );
}
