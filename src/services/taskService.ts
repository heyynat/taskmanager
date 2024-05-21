import prismaClient from '../prisma';
import { Task, TaskStatus, UpdateTaskDTO } from '../interfaces/task';
import { TaskStateMachine } from './tasks/taskStateMachine';

class TaskService {
  static async createTask(newTask: Task) {
    return await prismaClient.task.create({ data: newTask });
  }

  static async getTasks() {
    return await prismaClient.task.findMany();
  }

  static async getTaskById(id: string) {
    const task = await prismaClient.task.findUnique({ where: { id } });

    if (!task) throw new Error('Tarefa não encontrada');

    return task;
  }

  static async updateTask(id: string, updatedTask: UpdateTaskDTO) {
    const taskFound = await this.getTaskById(id);

    if (!taskFound) return taskFound

    return await prismaClient.task.update({ where: { id }, data: updatedTask });
  }

  static async deleteTask(id: string) {
    const taskFound = await this.getTaskById(id);

    if (!taskFound) return taskFound

    return await prismaClient.task.delete({ where: { id } });
  }

  static async transitionTaskStatus(taskId: string, status: TaskStatus) {
    const task = await this.getTaskById(taskId);
    const taskStateMachine = new TaskStateMachine(task as Task);
    taskStateMachine.transition(status);

    await prismaClient.task.update({
      where: { id: task.id },
      data: { status: task.status },
    });

    return task;
  }
}

export default TaskService;
