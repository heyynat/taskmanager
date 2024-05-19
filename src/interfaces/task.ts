export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: TaskStatus;
}
  
export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on-hold',
  CANCELLED = 'cancelled',
}
