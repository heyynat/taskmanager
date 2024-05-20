import { FastifyInstance } from "fastify";
import TaskController from "./controllers/taskController";

export async function routes(fastify: FastifyInstance) {
    fastify.get("/tasks", TaskController.getTasks);
    fastify.post("/tasks/new", TaskController.createTask);
    fastify.get("/tasks/:id", TaskController.getTaskById);
    fastify.put("/tasks/edit/:id", TaskController.updateTask);
    fastify.delete("/tasks/:id", TaskController.deleteTask);
}
