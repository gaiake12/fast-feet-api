import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserValidator } from "./DeleteUserValidator";
import { DeleteUser } from "./DeleteUser";

export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUser,
    private readonly deleteUserValidator: DeleteUserValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.deleteUserValidator.validate(request.params);

    const deleteUserResponse = await this.deleteUserUseCase.execute(data);
    return response.send(deleteUserResponse);
  }
}
