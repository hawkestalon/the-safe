import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../errors";

export const AuthenticationPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedError('user not authenticated!');
    const token = authorization.split(' ').pop() || '';
    if (jwt.verify(token, 'secretkey')) {
      return;
    }
    throw new UnauthorizedError('user not authenticated!');
  });
});
