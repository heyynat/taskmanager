import { TaskStatus } from "../interfaces/task";

export const TaskStatusTranslations = {
    [TaskStatus.PENDING]: "Pendente",
    [TaskStatus.IN_PROGRESS]: "Em Progresso",
    [TaskStatus.COMPLETED]: "Concluída",
    [TaskStatus.CANCELLED]: "Cancelada",
  };
  