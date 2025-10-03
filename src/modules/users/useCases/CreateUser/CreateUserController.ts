import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserValidator } from "./CreateUserValidator";
import { CreateUser } from "./CreateUser";

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly createUserValidator: CreateUserValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.createUserValidator.validate(request.body);

    const createdUserResponse = await this.createUserUseCase.execute(data);
    return response.send(createdUserResponse);
  }
}
