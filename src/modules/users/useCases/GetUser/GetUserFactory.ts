import { FastifyRequest, FastifyReply } from "fastify";

import { GetUser } from "./GetUser";
import { GetUserValidator } from "./GetUserValidator";
import { GetUserController } from "./GetUserController";

import prisma from "@/shared/infra/prisma/client";

export class GetUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const getUserUseCase = new GetUser(prisma);
    const getUserValidator = new GetUserValidator();

    const getUserController = new GetUserController(
      getUserUseCase,
      getUserValidator
    ); 

    return getUserController.handle(request, response);
  }
}
