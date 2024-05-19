import prismaClient from "../prisma";
import { CreateTaskDTO, UpdateTaskDTO } from "../interfaces/task";

class TaskService {
  static async createTask(newTask: CreateTaskDTO) {
    return await prismaClient.task.create({ data: newTask });
  }

  static async getTasks() {
    return await prismaClient.task.findMany();
  }

  static async getTaskById(id: string) {
    return await prismaClient.task.findUnique({ where: { id } });
  }

  static async updateTask(id: string, updatedTask: UpdateTaskDTO) {
    await prismaClient.task.update({ where: { id }, data: updatedTask });
  }

  static async deleteTask(id: string) {
    await prismaClient.task.delete({ where: { id } });
  }
}

export default TaskService;
