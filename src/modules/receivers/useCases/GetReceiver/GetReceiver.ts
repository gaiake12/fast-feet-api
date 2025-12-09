import type { PrismaClient, Receiver } from "@prisma/client";
import { ReceiverNotFound } from "../../errors/ReceiverNotFound";

interface GetReceiverRequest {
  receiverId: string;
}

interface GetReceiverResponse {
  receiver: Receiver;
}

export class GetReceiver {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: GetReceiverRequest): Promise<GetReceiverResponse> {
    const receiver = await this.prisma.receiver.findUnique({
      where: { id: data.receiverId },
    });

    if (!receiver) {
      throw new ReceiverNotFound();
    }

    return { receiver };
  }
}
