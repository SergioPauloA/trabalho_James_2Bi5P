"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GroupForm } from "@/components/task3/GroupForm";
import { GrupoProjetoInput } from "@/types";
import { createGrupo } from "@/services/grupoProjetoService";

export default function NovoGrupoPage() {
  const router = useRouter();

  const handleSubmit = async (input: GrupoProjetoInput) => {
    await createGrupo(input);
    router.push("/task-3/grupos");
  };

  return (
    <section className="card">
      <div className="header-row">
        <h1>Cadastrar Grupo de Projeto</h1>
        <Link href="/task-3/grupos" className="button-link secondary">Voltar</Link>
      </div>
      <GroupForm onSubmit={handleSubmit} submitLabel="Salvar grupo" />
    </section>
  );
}
