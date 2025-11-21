import type { FastifyRequest, FastifyReply } from "fastify";
import { jwtProvider } from "../providers/JWTProvider";
import prisma from "../prisma/client";

export const ensureIsAuthenticated = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const refreshToken = request.cookies.refreshToken;

  if (!refreshToken) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const decodedToken = await jwtProvider.verify(refreshToken);

  if (!decodedToken.sub) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: decodedToken.sub },
  });

  if (!user) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  return;
};
