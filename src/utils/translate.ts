import { TaskStatus } from '../interfaces/task';
import { TaskStatusTranslations } from '../locales/ptBR';

export function translateTaskStatus(status: TaskStatus): string {
  return TaskStatusTranslations[status] || status;
}
