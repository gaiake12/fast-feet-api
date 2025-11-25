import type { PrismaClient, Receiver } from "@prisma/client";

interface CreateReceiverRequest {
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
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
