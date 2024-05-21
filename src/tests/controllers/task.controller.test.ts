import TaskController from '../../controllers/taskController';
import { Task, TaskStatus, UpdateTaskDTO } from '../../interfaces/task';
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

  describe('getTasks', () => {
    test('should return tasks successfully', async () => {
      const tasks = [{ id: '1', title: 'Tarefa 1', description: null, status: 'pending', created_at: null, updated_at: null }];
      jest.spyOn(TaskService, 'getTasks').mockResolvedValueOnce(tasks);

      await TaskController.getTasks(mockRequest, mockReply);

      expect(TaskService.getTasks).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify(tasks));
    });

    test('should return 404 error when no tasks found', async () => {
      const error = new Error('Erro ao obter tarefas');
      jest.spyOn(TaskService, 'getTasks').mockRejectedValueOnce(error);

      await TaskController.getTasks(mockRequest, mockReply);

      expect(TaskService.getTasks).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Erro ao obter tarefas' });
    });
  });

  describe('getTaskById', () => {
    test('should return a task successfully', async () => {
      const task = { id: '1', title: 'Tarefa 1', description: null, status: 'pending', created_at: null, updated_at: null };
      jest.spyOn(TaskService, 'getTaskById').mockResolvedValueOnce(task);

      mockRequest.params = { id: '1' };
      await TaskController.getTaskById(mockRequest, mockReply);

      expect(TaskService.getTaskById).toHaveBeenCalledWith('1');
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify(task));
    });

    test('should return 404 error when task is not found', async () => {
      const error = new Error('Tarefa não encontrada');
      jest.spyOn(TaskService, 'getTaskById').mockRejectedValueOnce(error);

      mockRequest.params = { id: '1' };
      await TaskController.getTaskById(mockRequest, mockReply);

      expect(TaskService.getTaskById).toHaveBeenCalledWith('1');
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Tarefa não encontrada' });
    });
  });

  describe('updateTask', () => {
    test('should update a task successfully', async () => {
      const taskId = '1';
      const updatedTaskData: UpdateTaskDTO = { 
        title: 'Tarefa atualizada',
        status: TaskStatus.PENDING
      };
      const updatedTask = {
        id: taskId,
        title: 'Tarefa atualizada',
        description: null,
        status: 'in-progress',
        created_at: new Date(),
        updated_at: new Date()
      };
      
      jest.spyOn(TaskService, 'updateTask').mockResolvedValueOnce(updatedTask);
      
      mockRequest.query = { id: taskId };
      mockRequest.body = updatedTaskData;
      
      await TaskController.updateTask(mockRequest, mockReply);
  
      expect(TaskService.updateTask).toHaveBeenCalledWith(taskId, updatedTaskData);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify(updatedTaskData));
    });

    test('should return 500 error on update task failure', async () => {
      const taskId = '1';
      const updatedTaskData: UpdateTaskDTO = { title: 'Tarefa atualizada' };
      const error = new Error('Erro ao atualizar tarefa');
      
      jest.spyOn(TaskService, 'updateTask').mockRejectedValueOnce(error);

      mockRequest.query = { id: taskId };
      mockRequest.body = updatedTaskData;
      
      await TaskController.updateTask(mockRequest, mockReply);

      expect(TaskService.updateTask).toHaveBeenCalledWith(taskId, updatedTaskData);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Erro ao atualizar tarefa' });
    });
  });

  describe('deleteTask', () => {
    test('should delete a task successfully', async () => {
      const taskId = '1';
      const mockTask = {
        id: taskId,
        title: 'New task',
        description: null,
        status: TaskStatus.IN_PROGRESS,
        created_at: null,
        updated_at: null
      };
    
      jest.spyOn(TaskService, 'deleteTask').mockResolvedValueOnce(mockTask);
      
      mockRequest.params = { id: taskId };
      
      await TaskController.deleteTask(mockRequest, mockReply);
      
      expect(TaskService.deleteTask).toHaveBeenCalledWith(taskId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(JSON.stringify({ message: 'Tarefa excluída com sucesso' }));
    });

    test('should return 500 error on delete task failure', async () => {
      const taskId = '1';
      const error = new Error('Erro ao excluir tarefa');
      
      jest.spyOn(TaskService, 'deleteTask').mockRejectedValueOnce(error);

      mockRequest.params = { id: taskId };
      
      await TaskController.deleteTask(mockRequest, mockReply);

      expect(TaskService.deleteTask).toHaveBeenCalledWith(taskId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Erro ao excluir tarefa' });
    });
  });

  describe('transitionTaskStatus', () => {
    test('should transition task status successfully', async () => {
      const taskId = '1';
      const status: TaskStatus = TaskStatus.IN_PROGRESS;
      const mockTask = { id: taskId, title: 'Tarefa 1', description: null, status: 'pending', created_at: null, updated_at: null };
      
      jest.spyOn(TaskService, 'transitionTaskStatus').mockResolvedValueOnce({ ...mockTask, status });
      
      mockRequest.params = { id: taskId };
      mockRequest.body = { status };
      
      await TaskController.transitionTaskStatus(mockRequest, mockReply);

      expect(TaskService.transitionTaskStatus).toHaveBeenCalledWith(taskId, status);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Status da tarefa atualizado com sucesso.' });
    });

    test('should return 500 error on transition task status failure', async () => {
      const taskId = '1';
      const status: TaskStatus = TaskStatus.IN_PROGRESS;
      const error = new Error('Erro ao atualizar status da tarefa');
      
      jest.spyOn(TaskService, 'transitionTaskStatus').mockRejectedValueOnce(error);

      mockRequest.params = { id: taskId };
      mockRequest.body = { status };
      
      await TaskController.transitionTaskStatus(mockRequest, mockReply);

      expect(TaskService.transitionTaskStatus).toHaveBeenCalledWith(taskId, status);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Erro ao atualizar status da tarefa' });
    });
  });
});

