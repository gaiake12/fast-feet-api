import type { Address, PrismaClient, Receiver } from "@prisma/client";

interface CreateReceiverRequest {
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

interface CreateReceiverResponse {
  receiver: Receiver;
}

export class CreateReceiver {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({
    address,
    ...data
  }: CreateReceiverRequest): Promise<CreateReceiverResponse> {
    const receiver = await this.prisma.receiver.create({
      data: {
        ...data,
        address: {
          create: address,
        },
      },
    });

    return { receiver };
  }
}
