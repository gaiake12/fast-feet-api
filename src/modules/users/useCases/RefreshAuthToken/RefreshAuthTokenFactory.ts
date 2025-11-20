import { FastifyRequest, FastifyReply } from "fastify";

import { RefreshAuthToken } from "./RefreshAuthToken";
import { RefreshAuthTokenController } from "./RefreshAuthTokenController";

import prisma from "@/shared/infra/prisma/client";
import { jwtProvider } from "@/shared/infra/providers/JWTProvider";

export class RefreshAuthTokenFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const refreshAuthTokenUseCase = new RefreshAuthToken(prisma, jwtProvider);

    const refreshAuthTokenController = new RefreshAuthTokenController(
      refreshAuthTokenUseCase
    );

    return refreshAuthTokenController.handle(request, response);
  }
}
