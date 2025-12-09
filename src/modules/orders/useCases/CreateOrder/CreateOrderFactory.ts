import { FastifyRequest, FastifyReply } from "fastify";

import { CreateOrder } from "./CreateOrder";
import { CreateOrderValidator } from "./CreateOrderValidator";
import { CreateOrderController } from "./CreateOrderController";

import prisma from "@/shared/infra/prisma/client";

export class CreateOrderFactory {
  static async make(request: FastifyRequest, response: FastifyReply) {
    const createOrderUseCase = new CreateOrder(prisma);
    const createOrderValidator = new CreateOrderValidator();

    const createOrderController = new CreateOrderController(
      createOrderUseCase,
      createOrderValidator
    ); 

    return createOrderController.handle(request, response);
  }
}
