import type { PrismaClient, User } from "@prisma/client";
import { hash } from "bcryptjs";

interface UpdateUserRequest {
  id: string;
  name?: string;
  cpf?: string;
  password?: string;
}

interface UpdateUserResponse {
  user: User;
}

export class UpdateUser {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = data.password
      ? await hash(data.password, 8)
      : user.hashedPassword;

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        ...data,
        hashedPassword,
      },
    });

    return { user: updatedUser };
  }
}
