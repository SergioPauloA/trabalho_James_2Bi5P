export type Curso = {
  id: string;
  nome: string;
};

export type PeriodoLetivo = {
  id: string;
  nome: string;
};

export type Turma = {
  id: string;
  nome: string;
  cursoId: string;
  periodoLetivoId: string;
};

export type Professor = {
  id: string;
  nome: string;
};

export type Aluno = {
  id: string;
  nome: string;
  turmaId: string;
};

export type LocalApresentacao = {
  id: string;
  nome: string;
};

export type GrupoProjeto = {
  id: string;
  nome: string;
  turma: Pick<Turma, "id" | "nome">;
  curso: Curso;
  periodoLetivo: PeriodoLetivo;
  professor: Professor;
  alunos: Pick<Aluno, "id" | "nome">[];
  local: LocalApresentacao;
  horarioInicio: string;
  horarioFim: string;
};

export type GroupFiltersInput = {
  aluno: string;
  professorId: string;
  turmaId: string;
  cursoId: string;
  periodoLetivoId: string;
};

export type GrupoProjetoInput = {
  nome: string;
  turmaId: string;
  professorId: string;
  alunoIds: string[];
  localId: string;
  horarioInicio: string;
  horarioFim: string;
};

export type CatalogData = {
  cursos: Curso[];
  periodosLetivos: PeriodoLetivo[];
  turmas: Turma[];
  professores: Professor[];
  alunos: Aluno[];
  locais: LocalApresentacao[];
};

export type AvaliacaoInput = {
  grupoId: string;
  nota: number;
};
