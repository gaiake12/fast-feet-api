import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "@/shared/infra/prisma/client";
import { CreateUser } from "./CreateUser";
import { CreateUserValidator } from "./CreateUserValidator";
import { CreateUserController } from "./CreateUserController";

export class CreateUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const createUserUseCase = new CreateUser(prisma);
    const createUserValidator = new CreateUserValidator();

    const createUserController = new CreateUserController(
      createUserUseCase,
      createUserValidator
    );
    return createUserController.handle(request, response);
  }
}
