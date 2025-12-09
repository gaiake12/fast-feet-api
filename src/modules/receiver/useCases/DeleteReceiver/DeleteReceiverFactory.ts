import { FastifyRequest, FastifyReply } from "fastify";

import { DeleteReceiver } from "./DeleteReceiver";
import { DeleteReceiverValidator } from "./DeleteReceiverValidator";
import { DeleteReceiverController } from "./DeleteReceiverController";

import prisma from "@/shared/infra/prisma/client";

export class DeleteReceiverFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const deleteReceiverUseCase = new DeleteReceiver(prisma);
    const deleteReceiverValidator = new DeleteReceiverValidator();

    const deleteReceiverController = new DeleteReceiverController(
      deleteReceiverUseCase,
      deleteReceiverValidator
    ); 

    return deleteReceiverController.handle(request, response);
  }
}
