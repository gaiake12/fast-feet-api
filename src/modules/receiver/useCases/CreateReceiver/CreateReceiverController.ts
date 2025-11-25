import { FastifyReply, FastifyRequest } from "fastify";
import { CreateReceiverValidator } from "./CreateReceiverValidator";
import { CreateReceiver } from "./CreateReceiver";

export class CreateReceiverController {
  constructor(
    private readonly createReceiverUseCase: CreateReceiver,
    private readonly createReceiverValidator: CreateReceiverValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.createReceiverValidator.validate(request.body);

    const createReceiverResponse = await this.createReceiverUseCase.execute(data);
    return response.send(createReceiverResponse);
  }
}