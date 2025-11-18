import { FastifyRequest, FastifyReply } from "fastify";

import { AuthenticateUser } from "./AuthenticateUser";
import { AuthenticateUserValidator } from "./AuthenticateUserValidator";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { jwtProvider } from "@/shared/infra/providers/JWTProvider";

import prisma from "@/shared/infra/prisma/client";

export class AuthenticateUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const authenticateUserUseCase = new AuthenticateUser(prisma, jwtProvider);
    const authenticateUserValidator = new AuthenticateUserValidator();

    const authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase,
      authenticateUserValidator
    );

    return authenticateUserController.handle(request, response);
  }
}
