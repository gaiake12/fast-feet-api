import { usersRepository } from "@/shared/infra/providers/database";
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUser } from "./CreateUser";
import { CreateUserValidator } from "./CreateUserValidator";
import { CreateUserController } from "./CreateUserController";

export class CreateUserFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const createUserUseCase = new CreateUser(usersRepository);
    const createUserValidator = new CreateUserValidator();

    const createUserController = new CreateUserController(
      createUserUseCase,
      createUserValidator
    );
    return createUserController.handle(request, response);
  }
}
