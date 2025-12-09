import { FastifyRequest, FastifyReply } from "fastify";

import { CreateReceiver } from "./CreateReceiver";
import { CreateReceiverValidator } from "./CreateReceiverValidator";
import { CreateReceiverController } from "./CreateReceiverController";

import prisma from "@/shared/infra/prisma/client";

export class CreateReceiverFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const createReceiverUseCase = new CreateReceiver(prisma);
    const createReceiverValidator = new CreateReceiverValidator();

    const createReceiverController = new CreateReceiverController(
      createReceiverUseCase,
      createReceiverValidator
    ); 

    return createReceiverController.handle(request, response);
  }
}
