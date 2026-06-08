"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GroupForm } from "@/components/task3/GroupForm";
import { getGrupoById, updateGrupo } from "@/services/grupoProjetoService";

export default function EditarGrupoPage({ params }) {
  const router = useRouter();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      try {
        const response = await getGrupoById(id);
        setGroup(response);
      } catch {
        setError("Não foi possível carregar o grupo para edição.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params]);

  const handleSubmit = async (input) => {
    if (!group) {
      return;
    }
    await updateGrupo(group.id, input);
    router.push("/task-3/grupos");
  };

  return (
    <section className="card">
      <div className="header-row">
        <h1>Editar Grupo de Projeto</h1>
        <Link href="/task-3/grupos" className="button-link secondary">Voltar</Link>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      {group && <GroupForm initialValue={group} onSubmit={handleSubmit} submitLabel="Atualizar grupo" />}
    </section>
  );
}
