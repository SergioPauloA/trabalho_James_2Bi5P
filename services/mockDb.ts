import {
  Aluno,
  AvaliacaoInput,
  CatalogData,
  Curso,
  GrupoProjeto,
  GrupoProjetoInput,
  LocalApresentacao,
  PeriodoLetivo,
  Professor,
  Turma,
} from "@/types";

const cursos: Curso[] = [
  { id: "c1", nome: "Engenharia de Software" },
  { id: "c2", nome: "Sistemas para Internet" },
];

const periodosLetivos: PeriodoLetivo[] = [
  { id: "p1", nome: "2026.1" },
  { id: "p2", nome: "2026.2" },
];

const turmas: Turma[] = [
  { id: "t1", nome: "ES-5A", cursoId: "c1", periodoLetivoId: "p1" },
  { id: "t2", nome: "SI-3B", cursoId: "c2", periodoLetivoId: "p2" },
];

const professores: Professor[] = [
  { id: "pr1", nome: "Prof. Ana Lima" },
  { id: "pr2", nome: "Prof. Carlos Souza" },
];

const locais: LocalApresentacao[] = [
  { id: "l1", nome: "Laboratório 1" },
  { id: "l2", nome: "Auditório" },
];

const alunos: Aluno[] = [
  { id: "a1", nome: "Alice", turmaId: "t1" },
  { id: "a2", nome: "Bruno", turmaId: "t1" },
  { id: "a3", nome: "Caio", turmaId: "t1" },
  { id: "a4", nome: "Diana", turmaId: "t1" },
  { id: "a5", nome: "Elisa", turmaId: "t1" },
  { id: "a6", nome: "Fábio", turmaId: "t1" },
  { id: "a7", nome: "Gabi", turmaId: "t2" },
  { id: "a8", nome: "Heitor", turmaId: "t2" },
  { id: "a9", nome: "Iara", turmaId: "t2" },
  { id: "a10", nome: "João", turmaId: "t2" },
];

let groups: (GrupoProjeto & { hasLinkedProject?: boolean })[] = [
  {
    id: "g1",
    nome: "InovaTech",
    turma: turmas[0],
    curso: cursos[0],
    periodoLetivo: periodosLetivos[0],
    professor: professores[0],
    alunos: [alunos[0], alunos[1], alunos[2]],
    local: locais[0],
    horarioInicio: "08:00",
    horarioFim: "09:00",
    hasLinkedProject: true,
  },
  {
    id: "g2",
    nome: "WebMinds",
    turma: turmas[1],
    curso: cursos[1],
    periodoLetivo: periodosLetivos[1],
    professor: professores[1],
    alunos: [alunos[6], alunos[7], alunos[8]],
    local: locais[1],
    horarioInicio: "10:00",
    horarioFim: "11:00",
    hasLinkedProject: false,
  },
];

const avaliacoes: { id: string; grupoId: string; nota: number }[] = [];

const buildGroup = (input: GrupoProjetoInput, id: string): GrupoProjeto => {
  const turma = turmas.find((item) => item.id === input.turmaId);
  const professor = professores.find((item) => item.id === input.professorId);
  const local = locais.find((item) => item.id === input.localId);
  if (!turma || !professor || !local) {
    throw new Error("Dados inválidos para cadastro de grupo");
  }
  const curso = cursos.find((item) => item.id === turma.cursoId);
  const periodoLetivo = periodosLetivos.find((item) => item.id === turma.periodoLetivoId);
  if (!curso || !periodoLetivo) {
    throw new Error("Catálogo inconsistente");
  }
  return {
    id,
    nome: input.nome,
    turma,
    curso,
    periodoLetivo,
    professor,
    alunos: alunos.filter((item) => input.alunoIds.includes(item.id)),
    local,
    horarioInicio: input.horarioInicio,
    horarioFim: input.horarioFim,
  };
};

export const mockDb = {
  getCatalogs: (): CatalogData => ({
    cursos,
    periodosLetivos,
    turmas,
    professores,
    alunos,
    locais,
  }),

  listGroups: (filters: {
    aluno?: string;
    professorId?: string;
    turmaId?: string;
    cursoId?: string;
    periodoLetivoId?: string;
  }): GrupoProjeto[] => {
    return groups.filter((group) => {
      const byAluno = filters.aluno
        ? group.alunos.some((student) => student.nome.toLowerCase().includes(filters.aluno!.toLowerCase()))
        : true;
      const byProfessor = filters.professorId ? group.professor.id === filters.professorId : true;
      const byTurma = filters.turmaId ? group.turma.id === filters.turmaId : true;
      const byCurso = filters.cursoId ? group.curso.id === filters.cursoId : true;
      const byPeriodo = filters.periodoLetivoId ? group.periodoLetivo.id === filters.periodoLetivoId : true;
      return byAluno && byProfessor && byTurma && byCurso && byPeriodo;
    });
  },

  getGroupById: (id: string): GrupoProjeto => {
    const group = groups.find((item) => item.id === id);
    if (!group) {
      throw new Error("Grupo não encontrado");
    }
    return group;
  },

  createGroup: (input: GrupoProjetoInput): GrupoProjeto => {
    const group = buildGroup(input, `g${Date.now()}`);
    groups = [...groups, { ...group, hasLinkedProject: false }];
    return group;
  },

  updateGroup: (id: string, input: GrupoProjetoInput): GrupoProjeto => {
    const existing = groups.find((item) => item.id === id);
    if (!existing) {
      throw new Error("Grupo não encontrado");
    }
    const updated = { ...buildGroup(input, id), hasLinkedProject: existing.hasLinkedProject };
    groups = groups.map((item) => (item.id === id ? updated : item));
    return updated;
  },

  canDeleteGroup: (id: string): { canDelete: boolean; message?: string } => {
    const group = groups.find((item) => item.id === id);
    if (!group) {
      throw new Error("Grupo não encontrado");
    }
    if (group.hasLinkedProject) {
      return {
        canDelete: false,
        message: "Não é possível excluir o grupo porque existe projeto vinculado.",
      };
    }
    return { canDelete: true };
  },

  deleteGroup: (id: string) => {
    const existing = groups.some((item) => item.id === id);
    if (!existing) {
      throw new Error("Grupo não encontrado");
    }
    groups = groups.filter((item) => item.id !== id);
  },

  saveAvaliacao: (input: AvaliacaoInput) => {
    const group = groups.find((item) => item.id === input.grupoId);
    if (!group) {
      throw new Error("Grupo não encontrado para avaliação");
    }
    avaliacoes.push({ id: `av${Date.now()}`, grupoId: input.grupoId, nota: input.nota });
  },
};
