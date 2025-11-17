import type { PrismaClient } from "@prisma/client";

interface DeleteUserRequest {
  id: string;
}

interface DeleteUserResponse {}

export class DeleteUser {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.user.delete({ where: { id } });

    return {};
  }
}
