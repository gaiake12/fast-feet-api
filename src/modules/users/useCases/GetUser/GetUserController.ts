import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserValidator } from "./GetUserValidator";
import { GetUser } from "./GetUser";

export class GetUserController {
  constructor(
    private readonly getUserUseCase: GetUser,
    private readonly getUserValidator: GetUserValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.getUserValidator.validate(request.params);

    const getUserResponse = await this.getUserUseCase.execute(data);
    return response.send(getUserResponse);
  }
}
