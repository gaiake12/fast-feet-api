import { FastifyRequest, FastifyReply } from "fastify";

import { UpdateReceiver } from "./UpdateReceiver";
import { UpdateReceiverValidator } from "./UpdateReceiverValidator";
import { UpdateReceiverController } from "./UpdateReceiverController";

import prisma from "@/shared/infra/prisma/client";

export class UpdateReceiverFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const updateReceiverUseCase = new UpdateReceiver(prisma);
    const updateReceiverValidator = new UpdateReceiverValidator();

    const updateReceiverController = new UpdateReceiverController(
      updateReceiverUseCase,
      updateReceiverValidator
    ); 

    return updateReceiverController.handle(request, response);
  }
}
