import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../errors";

declare module 'fastify' {
  interface FastifyRequest {
    userId:number;
  }
}

export const AuthenticationPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedError('user not authenticated!');
    const token = authorization.split(' ').pop() || '';
    const decodedToken = jwt.verify(token, 'secretkey');
    if (decodedToken) {
      request.userId = (decodedToken as jwt.JwtPayload).id;
    }
    throw new UnauthorizedError('user not authenticated!');
  });
});
