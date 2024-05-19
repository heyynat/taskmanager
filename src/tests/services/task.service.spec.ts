import prismaClient from '../../prisma';
import TaskService from '../../services/taskService';

jest.mock('../../prisma', () => ({
  task: {
    create: jest.fn(),
  },
}));

describe('TaskService', () => {
  describe('createTask', () => {
    test('deve criar uma tarefa com sucesso', async () => {
      const mockCreateTask = { id: 1, title: 'Nova Tarefa' };
      (prismaClient.task.create as jest.Mock).mockResolvedValueOnce(mockCreateTask);

      const newTask = { title: 'Nova Tarefa' };
      const createdTask = await TaskService.createTask(newTask);

      expect(prismaClient.task.create).toHaveBeenCalledWith({ data: newTask });
      expect(createdTask).toEqual(mockCreateTask);
    });

    test('deve retornar erro em caso de falha na criação da tarefa', async () => {
      const mockError = new Error('Erro ao criar tarefa');
      (prismaClient.task.create as jest.Mock).mockRejectedValueOnce(mockError);

      const newTask = { title: 'Nova Tarefa' };
      await expect(TaskService.createTask(newTask)).rejects.toThrowError('Erro ao criar tarefa');
    });
  });
});
