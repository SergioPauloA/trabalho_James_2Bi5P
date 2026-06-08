import Link from "next/link";

export default function HomePage() {
  return (
    <section className="card">
      <h1>Sistema de Gestão de Projetos Integradores</h1>
      <p>Selecione um módulo para navegar no sistema.</p>
      <div className="grid-links">
        <Link href="/login" className="button-link">TASK 1 - Login</Link>
        <Link href="/usuarios" className="button-link">TASK 1 - Usuários</Link>
        <Link href="/locais-apresentacao" className="button-link">TASK 1 - Locais de apresentação</Link>
        <Link href="/cursos" className="button-link">TASK 2 - Cursos</Link>
        <Link href="/periodos-letivos" className="button-link">TASK 2 - Períodos letivos</Link>
        <Link href="/turmas" className="button-link">TASK 2 - Turmas</Link>
        <Link href="/task-3/grupos" className="button-link">TASK 3 - Grupos de projeto</Link>
        <Link href="/task-3/avaliacoes" className="button-link">TASK 3 - Avaliação de projetos</Link>
      </div>
    </section>
  );
}
