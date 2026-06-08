"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getGrupoById } from "@/services/grupoProjetoService";

export default function VisualizarGrupoPage({ params }) {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      try {
        const response = await getGrupoById(id);
        setGroup(response);
      } catch {
        setError("Não foi possível carregar os dados do grupo.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params]);

  return (
    <section className="card">
      <div className="header-row">
        <h1>Detalhes do Grupo</h1>
        <Link href="/task-3/grupos" className="button-link secondary">Voltar</Link>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      {group && (
        <dl className="details-grid">
          <div><dt>Nome do grupo</dt><dd>{group.nome}</dd></div>
          <div><dt>Turma</dt><dd>{group.turma.nome}</dd></div>
          <div><dt>Curso</dt><dd>{group.curso.nome}</dd></div>
          <div><dt>Período letivo</dt><dd>{group.periodoLetivo.nome}</dd></div>
          <div><dt>Professor orientador</dt><dd>{group.professor.nome}</dd></div>
          <div><dt>Local de apresentação</dt><dd>{group.local.nome}</dd></div>
          <div><dt>Horário de início</dt><dd>{group.horarioInicio}</dd></div>
          <div><dt>Horário de fim</dt><dd>{group.horarioFim}</dd></div>
          <div><dt>Alunos</dt><dd>{group.alunos.map((student) => student.nome).join(", ")}</dd></div>
        </dl>
      )}
    </section>
  );
}
