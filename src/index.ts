import fastify from 'fastify';
import { JsonWebTokenError } from 'jsonwebtoken';
import UserPlugin from './users/plugin';
import { LoginPlugin } from './authentication/login-plugin';
import { ResourceNotFoundError, UnauthorizedError } from './errors';
import FamilyPlugin from './family/plugin';
import CategoryPlugin from './categories/plugin';
import MonthlyCategoryPlugin from './monthly-category/plugin';

const port: number = Number(process.env.port) || 3001;

const server = fastify({ logger: true });

server.setErrorHandler((error, request, reply) => {
  throw error;
  console.log('Error -> ', error.constructor.name);
  if (error instanceof ResourceNotFoundError) {
    reply.status(404).send({
      error: {
        message: error.message,
      },
    });
  } else if (
    error instanceof UnauthorizedError ||
    error instanceof JsonWebTokenError
  ) {
    reply.status(401).send({ error: { message: error.message } });
  } else {
    reply.status(500).send({ error: { message: error.message } });
  }
});

server.get('/ping', async (request, reply) => {
  reply.send('pong');
});

server.register(LoginPlugin);
server.register(UserPlugin);
server.register(FamilyPlugin);
server.register(CategoryPlugin);
server.register(MonthlyCategoryPlugin);

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening on port: ', address);
});
