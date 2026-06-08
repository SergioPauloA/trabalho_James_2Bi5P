"use client";

import { useEffect, useState } from "react";
import { saveAvaliacao } from "@/services/avaliacaoService";
import { getGrupos } from "@/services/grupoProjetoService";
import { GrupoProjeto } from "@/types";
import { getErrorMessage } from "@/utils/errors";

export default function AvaliacoesPage() {
  const [groups, setGroups] = useState<GrupoProjeto[]>([]);
  const [groupId, setGroupId] = useState("");
  const [nota, setNota] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getGrupos({ aluno: "", professorId: "", turmaId: "", cursoId: "", periodoLetivoId: "" })
      .then(setGroups)
      .catch(() => setError("Não foi possível carregar grupos para avaliação."));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const parsedNota = Number(nota);
    if (!groupId) {
      setError("Selecione um grupo para avaliar.");
      return;
    }
    if (Number.isNaN(parsedNota) || parsedNota < 0 || parsedNota > 10) {
      setError("A nota deve estar entre 0 e 10.");
      return;
    }

    try {
      await saveAvaliacao({ grupoId: groupId, nota: parsedNota });
      setSuccess("Avaliação registrada com sucesso.");
      setNota("");
      setGroupId("");
    } catch (error) {
      setError(getErrorMessage(error, "Erro ao salvar avaliação."));
    }
  };

  return (
    <section className="card">
      <h1>Avaliação de Projetos</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Grupo ou projeto
          <select value={groupId} onChange={(event) => setGroupId(event.target.value)}>
            <option value="">Selecione</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.nome} - {group.turma.nome}
              </option>
            ))}
          </select>
        </label>
        <label>
          Nota (0 a 10)
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={nota}
            onChange={(event) => setNota(event.target.value)}
          />
        </label>
        <button type="submit">Salvar avaliação</button>
      </form>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
    </section>
  );
}
