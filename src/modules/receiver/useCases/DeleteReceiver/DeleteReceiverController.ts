import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteReceiverValidator } from "./DeleteReceiverValidator";
import { DeleteReceiver } from "./DeleteReceiver";

export class DeleteReceiverController {
  constructor(
    private readonly deleteReceiverUseCase: DeleteReceiver,
    private readonly deleteReceiverValidator: DeleteReceiverValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.deleteReceiverValidator.validate(request.params);

    const deleteReceiverResponse =
      await this.deleteReceiverUseCase.execute(data);
    return response.send(deleteReceiverResponse);
  }
}
