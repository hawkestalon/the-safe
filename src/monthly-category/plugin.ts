import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticationPlugin } from '../authentication/authentication-plugin';
import { initiateNewMonthCategories } from './service';

const monthlyCategoryPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
  fastify.post(
    '/monthly/categories/initiate/:familyId',
    async (
      request: FastifyRequest<{ Params: { familyId: number } }>,
      reply: FastifyReply,
    ) => {
      const result = await initiateNewMonthCategories(request.params.familyId);

      reply.send(result);
    },
  );
};

export default monthlyCategoryPlugin;
