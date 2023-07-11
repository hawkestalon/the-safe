import { FastifyInstance } from "fastify";
import { AuthenticationPlugin } from "../authentication/authentication-plugin";

const monthlyCategoryPlugin = async (fastify: FastifyInstance) => {
  fastify.register(AuthenticationPlugin);
}