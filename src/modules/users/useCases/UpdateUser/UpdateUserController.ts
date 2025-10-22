import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { UpdateUser } from "./UpdateUser";

export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUser,
    private readonly updateUserValidator: UpdateUserValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.updateUserValidator.validate(request.body);

    const updateUserResponse = await this.updateUserUseCase.execute(data);
    return response.send(updateUserResponse);
  }
}