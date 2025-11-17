import { FastifyRequest, FastifyReply } from "fastify";

import { DeleteUser } from "./DeleteUser";
import { DeleteUserValidator } from "./DeleteUserValidator";
import { DeleteUserController } from "./DeleteUserController";

import prisma from "@/shared/infra/prisma/client";

export class DeleteUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const deleteUserUseCase = new DeleteUser(prisma);
    const deleteUserValidator = new DeleteUserValidator();

    const deleteUserController = new DeleteUserController(
      deleteUserUseCase,
      deleteUserValidator
    ); 

    return deleteUserController.handle(request, response);
  }
}
