import { ReceiverNotFound } from "@/modules/receivers/errors/ReceiverNotFound";
import { AppError } from "@/shared/errors/AppError";
import type { PrismaClient } from "@prisma/client";

interface CreateOrderRequest {
  receiverId: string;
  deliveryPersonId: string;
}

interface CreateOrderResponse {}

export class CreateOrder {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({
    receiverId,
    deliveryPersonId,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const hasReceiver = await this.prisma.receiver.findUnique({
      where: { id: receiverId },
    });

    if (!hasReceiver) {
      throw new ReceiverNotFound();
    }

    const hasDeliveryPerson = await this.prisma.user.findUnique({
      where: { id: deliveryPersonId },
    });

    if (!hasDeliveryPerson) {
      throw new AppError({
        message: "Delivery person not found",
        statusCode: 404,
      });
    }

    const order = await this.prisma.order.create({
      data: {
        receiverId,
        deliveryPersonId,
        status: "AVAILABLE",
      },
    });

    return { order };
  }
}
