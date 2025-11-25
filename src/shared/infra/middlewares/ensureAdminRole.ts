import type { FastifyReply, FastifyRequest } from "fastify";

export const ensureAdminRole = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  const { isAdmin } = request.user as { isAdmin: boolean };

  if (!isAdmin) {
    return response.status(403).send({ message: "Forbidden" });
  }

  return true;
};
