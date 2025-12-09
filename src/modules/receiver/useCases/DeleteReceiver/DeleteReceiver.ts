import type { PrismaClient } from "@prisma/client";

interface DeleteReceiverRequest {
  receiverId: string;
}

interface DeleteReceiverResponse {}

export class DeleteReceiver {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: DeleteReceiverRequest): Promise<DeleteReceiverResponse> {
    const hasReceiver = await this.prisma.receiver.findUnique({
      where: { id: data.receiverId },
    });

    if (!hasReceiver) {
      throw new Error("Receiver not found");
    }

    await this.prisma.receiver.delete({ where: { id: data.receiverId } });

    return {};
  }
}
