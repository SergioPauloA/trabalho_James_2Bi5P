import { isEndTimeAfterStart } from "@/utils/time";

export const validateGrupoProjetoForm = (input, existingGroups, editingId) => {
  if (!input.nome.trim()) {
    return "Informe o nome do grupo.";
  }
  if (!input.turmaId || !input.professorId || !input.localId) {
    return "Preencha turma, professor orientador e local de apresentação.";
  }
  if (input.alunoIds.length < 3 || input.alunoIds.length > 7) {
    return "O grupo deve possuir entre 3 e 7 alunos.";
  }
  if (!isEndTimeAfterStart(input.horarioInicio, input.horarioFim)) {
    return "O horário final deve ser maior que o horário inicial.";
  }

  const conflictingGroup = existingGroups.find((group) => {
    if (group.id === editingId) {
      return false;
    }
    if (group.turma.id !== input.turmaId) {
      return false;
    }
    return group.alunos.some((student) => input.alunoIds.includes(student.id));
  });

  if (conflictingGroup) {
    return "Existe aluno selecionado que já pertence a outro grupo da mesma turma.";
  }

  return "";
};
