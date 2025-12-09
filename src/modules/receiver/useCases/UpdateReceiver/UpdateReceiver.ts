import type { Address, PrismaClient, Receiver } from "@prisma/client";
import { ReceiverNotFound } from "../../errors/ReceiverNotFound";

interface UpdateReceiverRequest {
  receiverId: string;
  name: string;
  email: string;
  address: Pick<
    Address,
    | "street"
    | "number"
    | "complement"
    | "neighborhood"
    | "city"
    | "state"
    | "zipCode"
    | "latitude"
    | "longitude"
  >;
}

interface UpdateReceiverResponse {
  receiver: Receiver;
}

export class UpdateReceiver {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({
    receiverId,
    address,
    ...data
  }: UpdateReceiverRequest): Promise<UpdateReceiverResponse> {
    const hasReceiver = await this.prisma.receiver.findUnique({
      where: { id: receiverId },
    });

    if (!hasReceiver) {
      throw new ReceiverNotFound();
    }

    const receiver = await this.prisma.receiver.update({
      where: { id: receiverId },
      data: {
        ...data,
        address: {
          update: { ...address },
        },
      },
    });

    return { receiver };
  }
}
