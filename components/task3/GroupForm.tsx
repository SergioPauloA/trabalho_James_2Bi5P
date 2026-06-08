"use client";

import { useEffect, useMemo, useState } from "react";
import { getCatalogs } from "@/services/catalogService";
import { getGrupos } from "@/services/grupoProjetoService";
import { validateGrupoProjetoForm } from "@/utils/validation";
import { CatalogData, GrupoProjeto, GrupoProjetoInput } from "@/types";

const emptyCatalogs: CatalogData = {
  cursos: [],
  periodosLetivos: [],
  turmas: [],
  professores: [],
  alunos: [],
  locais: [],
};

const emptyFilters = {
  aluno: "",
  professorId: "",
  turmaId: "",
  cursoId: "",
  periodoLetivoId: "",
};

export function GroupForm({
  initialValue,
  submitLabel,
  onSubmit,
}: {
  initialValue?: GrupoProjeto;
  submitLabel: string;
  onSubmit: (input: GrupoProjetoInput) => Promise<void>;
}) {
  const [catalogs, setCatalogs] = useState<CatalogData>(emptyCatalogs);
  const [existingGroups, setExistingGroups] = useState<GrupoProjeto[]>([]);
  const [formState, setFormState] = useState<GrupoProjetoInput>(() => ({
    nome: initialValue?.nome || "",
    turmaId: initialValue?.turma.id || "",
    professorId: initialValue?.professor.id || "",
    alunoIds: initialValue?.alunos.map((student) => student.id) || [],
    localId: initialValue?.local.id || "",
    horarioInicio: initialValue?.horarioInicio || "",
    horarioFim: initialValue?.horarioFim || "",
  }));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCatalogs().then(setCatalogs).catch(() => setCatalogs(emptyCatalogs));
    getGrupos(emptyFilters).then(setExistingGroups).catch(() => setExistingGroups([]));
  }, []);

  const availableStudents = useMemo(
    () => catalogs.alunos.filter((student) => student.turmaId === formState.turmaId || !formState.turmaId),
    [catalogs.alunos, formState.turmaId],
  );

  const toggleStudent = (id: string) => {
    if (formState.alunoIds.includes(id)) {
      setFormState({ ...formState, alunoIds: formState.alunoIds.filter((studentId) => studentId !== id) });
      return;
    }
    setFormState({ ...formState, alunoIds: [...formState.alunoIds, id] });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const validation = validateGrupoProjetoForm(formState, existingGroups, initialValue?.id);
    if (validation) {
      setError(validation);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formState);
    } catch {
      setError("Falha ao salvar grupo de projeto.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Nome do grupo
        <input
          value={formState.nome}
          onChange={(event) => setFormState({ ...formState, nome: event.target.value })}
          required
        />
      </label>

      <label>
        Turma
        <select
          value={formState.turmaId}
          onChange={(event) =>
            setFormState({
              ...formState,
              turmaId: event.target.value,
              alunoIds: [],
            })
          }
          required
        >
          <option value="">Selecione</option>
          {catalogs.turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
      </label>

      <label>
        Professor orientador
        <select
          value={formState.professorId}
          onChange={(event) => setFormState({ ...formState, professorId: event.target.value })}
          required
        >
          <option value="">Selecione</option>
          {catalogs.professores.map((professor) => (
            <option key={professor.id} value={professor.id}>{professor.nome}</option>
          ))}
        </select>
      </label>

      <label>
        Local de apresentação
        <select
          value={formState.localId}
          onChange={(event) => setFormState({ ...formState, localId: event.target.value })}
          required
        >
          <option value="">Selecione</option>
          {catalogs.locais.map((local) => (
            <option key={local.id} value={local.id}>{local.nome}</option>
          ))}
        </select>
      </label>

      <label>
        Horário de início
        <input
          type="time"
          value={formState.horarioInicio}
          onChange={(event) => setFormState({ ...formState, horarioInicio: event.target.value })}
          required
        />
      </label>

      <label>
        Horário de fim
        <input
          type="time"
          value={formState.horarioFim}
          onChange={(event) => setFormState({ ...formState, horarioFim: event.target.value })}
          required
        />
      </label>

      <fieldset>
        <legend>Alunos participantes</legend>
        <div className="checkbox-grid">
          {availableStudents.map((student) => (
            <label key={student.id}>
              <input
                type="checkbox"
                checked={formState.alunoIds.includes(student.id)}
                onChange={() => toggleStudent(student.id)}
              />
              {student.nome}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={submitting}>{submitLabel}</button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
