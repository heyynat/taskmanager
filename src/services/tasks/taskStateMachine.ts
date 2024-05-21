import { Task, TaskStatus } from "../../interfaces/task";
import { translateTaskStatus } from "../../utils/translate";

export interface ITaskStateMachine {
  transition(status: TaskStatus): void;
}

export class TaskStateMachine implements ITaskStateMachine {
  private task: Task;

  constructor(task: Task) {
    this.task = task;
  }

  public transition(status: TaskStatus): void {
    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
      [TaskStatus.PENDING]: [TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],
      [TaskStatus.IN_PROGRESS]: [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
      [TaskStatus.COMPLETED]: [],
      [TaskStatus.CANCELLED]: []
    };

    if (!validTransitions[this.task.status as TaskStatus].includes(status)) {
      throw new Error(`Não é possível transicionar de "${translateTaskStatus(this.task.status as TaskStatus)}" para "${translateTaskStatus(status)}"`);
    }

    this.task.status = status;
  }
}
