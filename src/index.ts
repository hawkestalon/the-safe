import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import UserPlugin from './users/plugin';
import { LoginPlugin } from './authentication/login-plugin';

const port: number = Number(process.env.port) || 3001;

const server = fastify({ logger: true });

server.get('/ping', async (request, reply) => {
  reply.send('pong');
});

server.register(LoginPlugin);
server.register(UserPlugin);

server.listen({ port }, ( err, address) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening on port: ', address);
});
