import { TaskStatus, UpdateTaskDTO } from '../../interfaces/task';
import prismaClient from '../../prisma';
import TaskService from '../../services/taskService';

jest.mock('../../prisma', () => ({
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('TaskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    test('should create a task successfully', async () => {
      const mockCreateTask = { id: 1, title: 'Nova Tarefa' };
      (prismaClient.task.create as jest.Mock).mockResolvedValueOnce(mockCreateTask);

      const newTask = { title: 'Nova Tarefa' };
      const createdTask = await TaskService.createTask(newTask);

      expect(prismaClient.task.create).toHaveBeenCalledWith({ data: newTask });
      expect(createdTask).toEqual(mockCreateTask);
    });

    test('should return an error in case of task creation failure', async () => {
      const mockError = new Error('Erro ao criar tarefa');
      (prismaClient.task.create as jest.Mock).mockRejectedValueOnce(mockError);

      const newTask = { title: 'Nova Tarefa' };
      await expect(TaskService.createTask(newTask)).rejects.toThrow('Erro ao criar tarefa');
    });
  });

  describe('getTasks', () => {
    test('should return a list of tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Tarefa 1' }, { id: 2, title: 'Tarefa 2' }];
      (prismaClient.task.findMany as jest.Mock).mockResolvedValueOnce(mockTasks);

      const tasks = await TaskService.getTasks();

      expect(prismaClient.task.findMany).toHaveBeenCalled();
      expect(tasks).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    test('should return a task by ID', async () => {
      const taskId = '1';
      const mockTask = { id: taskId, title: 'Tarefa 1' };
      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(mockTask);

      const task = await TaskService.getTaskById(taskId);

      expect(prismaClient.task.findUnique).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(task).toEqual(mockTask);
    });

    test('should throw an error if task is not found', async () => {
      const taskId = '1';
      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await expect(TaskService.getTaskById(taskId)).rejects.toThrow('Tarefa não encontrada');
    });
  });

  describe('updateTask', () => {
    test('should update a task successfully', async () => {
      const taskId = '1';
      const updatedTaskData: UpdateTaskDTO = { title: 'Tarefa atualizada' };
      const mockUpdatedTask = { id: taskId, ...updatedTaskData };

      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(mockUpdatedTask);
      (prismaClient.task.update as jest.Mock).mockResolvedValueOnce(mockUpdatedTask);

      const updatedTask = await TaskService.updateTask(taskId, updatedTaskData);

      expect(prismaClient.task.findUnique).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(prismaClient.task.update).toHaveBeenCalledWith({ where: { id: taskId }, data: updatedTaskData });
      expect(updatedTask).toEqual(mockUpdatedTask);
    });

    test('should throw an error if task is not found', async () => {
      const updatedTaskData = { title: 'Tarefa atualizada' };
      const taskId = '0';
      (prismaClient.task.update as jest.Mock).mockResolvedValueOnce(null);

      await expect(TaskService.updateTask(taskId, updatedTaskData)).rejects.toThrow('Tarefa não encontrada');
    });
  });

  describe('deleteTask', () => {
    test('should delete a task successfully', async () => {
      const taskId = '1';
      const mockTask = { id: taskId, title: 'Tarefa 1' };
      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(mockTask);
      (prismaClient.task.delete as jest.Mock).mockResolvedValueOnce(mockTask);

      const deletedTask = await TaskService.deleteTask(taskId);

      expect(prismaClient.task.delete).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(deletedTask).toEqual(mockTask);
    });

    test('should return an error in case of task deletion failure if the task is not found', async () => {
      const taskId = '1';
      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(null);

      expect(prismaClient.task.delete).not.toHaveBeenCalled();
      await expect(TaskService.deleteTask(taskId)).rejects.toThrow('Tarefa não encontrada');
    });
  });

  describe('transitionTaskStatus', () => {
    test('should transition task status successfully', async () => {
      const taskId = '1';
      const status = 'in-progress';
      const mockTask = { id: taskId, status: 'pending' };
      (prismaClient.task.findUnique as jest.Mock).mockResolvedValueOnce(mockTask);

      const updatedTaskStatus = await TaskService.transitionTaskStatus(taskId, status as TaskStatus);

      expect(prismaClient.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: { status: "in-progress" },
      });
      expect(updatedTaskStatus).toEqual({ ...mockTask, status: "in-progress" });
    });
  });
});