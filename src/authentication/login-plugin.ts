import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { loginUser } from '../users/service';
import { LoginBody } from '../users/types';

export const LoginPlugin = async (fastify: FastifyInstance) => {
  fastify.post(
    '/users/login',
    async (
      request: FastifyRequest<{ Body: LoginBody }>,
      reply: FastifyReply,
    ) => {
      const { email, password } = request.body;
      const token = await loginUser(email, password);

      reply.send({ token });
    },
  );
};
