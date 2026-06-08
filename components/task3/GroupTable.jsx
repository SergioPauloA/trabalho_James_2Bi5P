import Link from "next/link";

export function GroupTable({
  groups,
  onDelete,
}) {
  if (groups.length === 0) {
    return <p>Nenhum grupo encontrado.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Turma</th>
            <th>Curso</th>
            <th>Período letivo</th>
            <th>Professor</th>
            <th>Alunos</th>
            <th>Qtd. alunos</th>
            <th>Local</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.nome}</td>
              <td>{group.turma.nome}</td>
              <td>{group.curso.nome}</td>
              <td>{group.periodoLetivo.nome}</td>
              <td>{group.professor.nome}</td>
              <td>{group.alunos.map((student) => student.nome).join(", ")}</td>
              <td>{group.alunos.length}</td>
              <td>{group.local.nome}</td>
              <td>{group.horarioInicio}</td>
              <td>{group.horarioFim}</td>
              <td>
                <div className="actions-inline">
                  <Link href={`/task-3/grupos/${group.id}`} className="button-link small">Visualizar</Link>
                  <Link href={`/task-3/grupos/${group.id}/editar`} className="button-link small secondary">Editar</Link>
                  <button className="danger" onClick={() => onDelete(group.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
