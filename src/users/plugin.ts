import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { createUser, getUser, listUsers, loginUser } from "./service";
import { NewUser } from "./types";
import { AuthenticationPlugin } from "../authentication/authentication-plugin";

const UserPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
  fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await listUsers();
    reply.send(users);
  });
  fastify.get('/users/:userId', async (request: FastifyRequest<{ Params: { userId: number } }>, reply: FastifyReply) => {
    const user = await getUser(request.params.userId);

    reply.send(user);
  });
  fastify.post('/users', async (request: FastifyRequest<{Body: NewUser}>, reply: FastifyReply) => {
    const newUser = await createUser(request.body);

    reply.send(newUser);
  });
}

export default UserPlugin;
