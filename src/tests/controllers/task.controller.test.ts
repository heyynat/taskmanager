import TaskController from '../../controllers/taskController';
import { Task } from '../../interfaces/task';
import TaskService from '../../services/taskService';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('../../services/taskService');

describe('TaskController', () => {
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    mockRequest = {} as FastifyRequest;
    mockReply = { code: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as FastifyReply;
  });

  describe('createTask', () => {
    test('should create a task successfully', async () => {
      const newTask: Task = { title: 'Nova Tarefa' };
      const createdTask = { id: '1', title: 'Nova Tarefa', description: null, status: 'pending', created_at: null, updated_at: null };

      jest.spyOn(TaskService, 'createTask').mockResolvedValueOnce(createdTask);

      mockRequest.body = newTask;
      await TaskController.createTask(mockRequest, mockReply);

      expect(TaskService.createTask).toHaveBeenCalledWith(newTask);
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify({
        message: 'Tarefa criada com sucesso',
        task: createdTask
      }));
    });

    test('should return 500 error on create task failure', async () => {
      const newTask: Task = { title: 'Nova Tarefa' };
      const error = new Error('Erro ao criar tarefa');

      jest.spyOn(TaskService, 'createTask').mockRejectedValueOnce(error);

      mockRequest.body = newTask;
      await TaskController.createTask(mockRequest, mockReply);

      expect(TaskService.createTask).toHaveBeenCalledWith(newTask);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify({
        message: 'Erro ao criar tarefa'
      }));
    });
  });
});
