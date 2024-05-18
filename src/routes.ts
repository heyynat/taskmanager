import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/helloworld", async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.send("Hello World")      
    })
}

