"use client";

import { useEffect, useState } from "react";
import { getCatalogs } from "@/services/catalogService";
import { CatalogData, GroupFiltersInput } from "@/types";

const emptyCatalogs: CatalogData = {
  cursos: [],
  periodosLetivos: [],
  turmas: [],
  professores: [],
  alunos: [],
  locais: [],
};

export function GroupFilters({
  filters,
  onChange,
  onFilter,
  onClear,
}: {
  filters: GroupFiltersInput;
  onChange: (filters: GroupFiltersInput) => void;
  onFilter: () => void;
  onClear: () => void;
}) {
  const [catalogs, setCatalogs] = useState<CatalogData>(emptyCatalogs);

  useEffect(() => {
    getCatalogs().then(setCatalogs).catch(() => setCatalogs(emptyCatalogs));
  }, []);

  return (
    <div className="filter-grid">
      <input
        placeholder="Filtrar por aluno participante"
        value={filters.aluno}
        onChange={(event) => onChange({ ...filters, aluno: event.target.value })}
      />
      <select
        value={filters.professorId}
        onChange={(event) => onChange({ ...filters, professorId: event.target.value })}
      >
        <option value="">Professor orientador</option>
        {catalogs.professores.map((professor) => (
          <option key={professor.id} value={professor.id}>{professor.nome}</option>
        ))}
      </select>
      <select
        value={filters.turmaId}
        onChange={(event) => onChange({ ...filters, turmaId: event.target.value })}
      >
        <option value="">Turma</option>
        {catalogs.turmas.map((turma) => (
          <option key={turma.id} value={turma.id}>{turma.nome}</option>
        ))}
      </select>
      <select
        value={filters.cursoId}
        onChange={(event) => onChange({ ...filters, cursoId: event.target.value })}
      >
        <option value="">Curso</option>
        {catalogs.cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>{curso.nome}</option>
        ))}
      </select>
      <select
        value={filters.periodoLetivoId}
        onChange={(event) => onChange({ ...filters, periodoLetivoId: event.target.value })}
      >
        <option value="">Período letivo</option>
        {catalogs.periodosLetivos.map((periodo) => (
          <option key={periodo.id} value={periodo.id}>{periodo.nome}</option>
        ))}
      </select>
      <div className="actions-inline">
        <button type="button" onClick={onFilter}>Filtrar</button>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            onClear();
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
