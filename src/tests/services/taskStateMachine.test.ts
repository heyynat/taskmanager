import { Task, TaskStatus } from "../../interfaces/task";
import { TaskStateMachine } from "../../services/tasks/taskStateMachine";

describe("TaskStateMachine", () => {
  let task: Task;
  let stateMachine: TaskStateMachine;

  beforeEach(() => {
    task = { title: "Test Task", status: TaskStatus.PENDING };
    stateMachine = new TaskStateMachine(task);
  });

  it("should transition from PENDING to IN_PROGRESS", () => {
    stateMachine.transition(TaskStatus.IN_PROGRESS);
    expect(task.status).toEqual(TaskStatus.IN_PROGRESS);
  });

  it("should transition from PENDING to CANCELLED", () => {
    stateMachine.transition(TaskStatus.CANCELLED);
    expect(task.status).toEqual(TaskStatus.CANCELLED);
  });

  it("should transition from IN_PROGRESS to COMPLETED", () => {
    task.status = TaskStatus.IN_PROGRESS;

    stateMachine.transition(TaskStatus.COMPLETED);
    expect(task.status).toEqual(TaskStatus.COMPLETED);
  });

  it("should transition from IN_PROGRESS to CANCELLED", () => {
    task.status = TaskStatus.IN_PROGRESS;

    stateMachine.transition(TaskStatus.CANCELLED);
    expect(task.status).toEqual(TaskStatus.CANCELLED);
  });

  it("should transition from IN_PROGRESS to PENDING", () => {
    task.status = TaskStatus.IN_PROGRESS;

    expect(() => stateMachine.transition(TaskStatus.PENDING)).toThrow();
    expect(task.status).toEqual(TaskStatus.IN_PROGRESS);
  });

  it("should not transition from COMPLETED to any other status", () => {
    task.status = TaskStatus.COMPLETED;

    expect(() => stateMachine.transition(TaskStatus.IN_PROGRESS)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.PENDING)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.COMPLETED)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.CANCELLED)).toThrow();
  });
  
  it("should not transition from CANCELLED to any other status", () => {
    task.status = TaskStatus.CANCELLED;

    expect(() => stateMachine.transition(TaskStatus.IN_PROGRESS)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.PENDING)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.COMPLETED)).toThrow();
    expect(() => stateMachine.transition(TaskStatus.CANCELLED)).toThrow();
  });
});
