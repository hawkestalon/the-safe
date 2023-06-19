import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthenticationPlugin } from "../authentication/authentication-plugin";
import { NewCategory } from "./types";
import { createCategory, getCategory } from "./service";

const CategoryPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
  fastify.post('/category', async (request: FastifyRequest<{ Body: NewCategory }>, reply: FastifyReply) => {
    const newCategory = await createCategory(request.body);

    reply.send(newCategory);
  });
  fastify.get('/category/:categoryId', async (request: FastifyRequest<{ Params: { categoryId: number} }>, reply: FastifyReply) => {
    const category = await getCategory(request.params.categoryId);

    reply.send(category);
  });
};

export default CategoryPlugin;
