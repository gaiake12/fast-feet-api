import { FastifyReply, FastifyRequest } from "fastify";
import { GetReceiverValidator } from "./GetReceiverValidator";
import { GetReceiver } from "./GetReceiver";

export class GetReceiverController {
  constructor(
    private readonly getReceiverUseCase: GetReceiver,
    private readonly getReceiverValidator: GetReceiverValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.getReceiverValidator.validate(request.params);

    const getReceiverResponse = await this.getReceiverUseCase.execute(data);
    return response.send(getReceiverResponse);
  }
}
