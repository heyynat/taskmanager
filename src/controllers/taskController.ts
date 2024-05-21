import { Task, TaskStatus, UpdateTaskDTO } from "../interfaces/task";
import { FastifyRequest, FastifyReply } from "fastify";
import TaskService from "../services/taskService";

class TaskController {
  static async createTask(request: FastifyRequest, reply: FastifyReply) {
    const newTask = request.body as Task;

    try {
      const createdTask = await TaskService.createTask(newTask);
      reply.code(201).send(JSON.stringify({ message: "Tarefa criada com sucesso", task: createdTask }));
    } catch (error) {
      reply.code(500).send(JSON.stringify({ message: "Erro ao criar tarefa" }));
    }
  }

  static async getTasks(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks = await TaskService.getTasks();
      reply.code(200).send(JSON.stringify(tasks));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao obter tarefas';
      reply.code(404).send({ message: errorMessage });
    }
  }

  static async getTaskById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const task = await TaskService.getTaskById(id);
      reply.code(200).send(JSON.stringify(task));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao obter tarefa';
      reply.code(404).send({ message: errorMessage });
    }
  }

  static async updateTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };
    const updatedTask = request.body as UpdateTaskDTO;

    try {
      await TaskService.updateTask(id, updatedTask);
      reply.code(200).send(JSON.stringify(updatedTask));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar tarefa';
      reply.code(500).send({ message: errorMessage });
    }
  }

  static async deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      await TaskService.deleteTask(id);
      reply.code(200).send(JSON.stringify({ message: "Tarefa excluída com sucesso" }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir tarefa';
      reply.code(500).send({ message: errorMessage });
    }
  }

  static async transitionTaskStatus(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: TaskStatus };

    try {
      await TaskService.transitionTaskStatus(id, status);
      reply.code(200).send({ message: 'Status da tarefa atualizado com sucesso.' });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar tarefa';
      reply.code(500).send({ message: errorMessage });
    }
  }
}

export default TaskController;
