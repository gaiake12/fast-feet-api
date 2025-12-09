import { FastifyRequest, FastifyReply } from "fastify";

import { GetReceiver } from "./GetReceiver";
import { GetReceiverValidator } from "./GetReceiverValidator";
import { GetReceiverController } from "./GetReceiverController";

import prisma from "@/shared/infra/prisma/client";

export class GetReceiverFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const getReceiverUseCase = new GetReceiver(prisma);
    const getReceiverValidator = new GetReceiverValidator();

    const getReceiverController = new GetReceiverController(
      getReceiverUseCase,
      getReceiverValidator
    ); 

    return getReceiverController.handle(request, response);
  }
}
