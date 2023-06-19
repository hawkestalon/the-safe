import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthenticationPlugin } from "../authentication/authentication-plugin";
import { createFamily, getFamily, listFamilies } from "./service";

const FamilyPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
  fastify.get('/family/:familyId', async (request: FastifyRequest<{ Params: { familyId: number} }>, reply: FastifyReply) => {
    const family = await getFamily(request.params.familyId);

    reply.send(family);
  });
  fastify.get('/family', async (request: FastifyRequest, reply: FastifyReply) => {
    const families = await listFamilies();

    reply.send(families);
  });
  fastify.post('/family', async (request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) => {
    const newFamily = await createFamily(request.body.name)
    reply.send(newFamily);
  });
};

export default FamilyPlugin
