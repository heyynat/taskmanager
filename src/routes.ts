import { FastifyInstance } from "fastify";
import TaskController from "./controllers/taskController";

export async function routes(fastify: FastifyInstance) {
    fastify.get("https://heyynat.github.io/taskmanager/tasks", TaskController.getTasks);
    fastify.post("https://heyynat.github.io/taskmanager/tasks/new", TaskController.createTask);
    fastify.get("https://heyynat.github.io/taskmanager/tasks/:id", TaskController.getTaskById);
    fastify.put("https://heyynat.github.io/taskmanager/tasks/edit/:id", TaskController.updateTask);
    fastify.delete("https://heyynat.github.io/taskmanager/tasks/:id", TaskController.deleteTask);
}
