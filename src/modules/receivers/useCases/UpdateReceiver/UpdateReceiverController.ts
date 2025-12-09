import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateReceiverValidator } from "./UpdateReceiverValidator";
import { UpdateReceiver } from "./UpdateReceiver";

export class UpdateReceiverController {
  constructor(
    private readonly updateReceiverUseCase: UpdateReceiver,
    private readonly updateReceiverValidator: UpdateReceiverValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.updateReceiverValidator.validate({
      ...request.body,
      ...request.params,
    });

    const updateReceiverResponse =
      await this.updateReceiverUseCase.execute(data);
    return response.send(updateReceiverResponse);
  }
}
