import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderValidator } from "./CreateOrderValidator";
import { CreateOrder } from "./CreateOrder";

export class CreateOrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrder,
    private readonly createOrderValidator: CreateOrderValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.createOrderValidator.validate(request.body);

    const createOrderResponse = await this.createOrderUseCase.execute(data);
    return response.send(createOrderResponse);
  }
}