import type { PrismaClient, User } from "@prisma/client";

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: Pick<User, "id">;
}

export class GetUser {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { user };
  }
}
