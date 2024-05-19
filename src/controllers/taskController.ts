import { CreateTaskDTO, UpdateTaskDTO } from "../interfaces/task";
import prismaClient from "../prisma";
import { FastifyRequest, FastifyReply } from 'fastify';
import TaskService from "../services/taskService";

class TaskController {
  static async createTask(request: FastifyRequest, reply: FastifyReply) {
    const newTask = request.body as CreateTaskDTO;

    try {
      const createdTask = await TaskService.createTask(newTask);
      reply.code(201).send(JSON.stringify({ message: 'Tarefa criada com sucesso', task: createdTask }));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: 'Erro ao criar tarefa' }));
    }
  }

  static async getTasks(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks = await TaskService.getTasks();
      reply.code(200).send(JSON.stringify(tasks));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: 'Erro ao obter tarefas' }));
    }
  }

  static async getTaskById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const task = await TaskService.getTaskById(id);
      if (!task) {
        return reply.code(404).send(JSON.stringify({ message: 'Tarefa não encontrada' }));
      }
      reply.code(200).send(JSON.stringify(task));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: 'Erro ao obter tarefa' }));
    }
  }

  static async updateTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };
    const updatedTask = request.body as UpdateTaskDTO;

    try {
      await TaskService.updateTask(id, updatedTask);
      if (!updatedTask) {
        return reply.code(404).send(JSON.stringify({ message: 'Tarefa não encontrada' }));
      }
      reply.code(200).send(JSON.stringify(updatedTask));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: 'Erro ao atualizar tarefa' }));
    }
  }

  static async deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      await TaskService.deleteTask(id);
      await prismaClient.task.delete({ where: { id } });
      reply.code(200).send(JSON.stringify({ message: 'Tarefa excluída com sucesso' }));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: 'Erro ao excluir tarefa' }));
    }
  }
}

export default TaskController;
