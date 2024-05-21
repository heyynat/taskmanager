export interface Task {
  title: string;
  description?: string;
  status?: TaskStatus;
}
  
export interface UpdateTaskDTO {
  title?: string;
  description?: string;
}

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
