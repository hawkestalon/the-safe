import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthenticationPlugin } from "../authentication/authentication-plugin";
import { createNewMonthCategories } from "./service";

const monthlyCategoryPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
  fastify.post('/monthly/categories/initiate/:familyId', async (request: FastifyRequest<{ Params: {familyId: number}}>, reply: FastifyReply) => {
    const result = await createNewMonthCategories(request.params.familyId);

    reply.send(result);
  });
};

export default monthlyCategoryPlugin;