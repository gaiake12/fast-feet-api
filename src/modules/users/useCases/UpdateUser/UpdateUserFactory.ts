import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { UpdateUserController } from "./UpdateUserController";

import prisma from "@/shared/infra/prisma/client";

export class UpdateUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const updateUserUseCase = new UpdateUser(prisma);
    const updateUserValidator = new UpdateUserValidator();

    const updateUserController = new UpdateUserController(
      updateUserUseCase,
      updateUserValidator
    );

    return updateUserController.handle(request, response);
  }
}
