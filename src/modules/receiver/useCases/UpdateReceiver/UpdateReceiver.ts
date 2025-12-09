import type { Address, PrismaClient, Receiver } from "@prisma/client";

interface UpdateReceiverRequest {
  id: string;
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
    id,
    address,
    ...data
  }: UpdateReceiverRequest): Promise<UpdateReceiverResponse> {
    const receiver = await this.prisma.receiver.update({
      where: { id },
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
