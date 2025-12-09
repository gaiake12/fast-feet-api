import { hash } from "bcryptjs";
import type { PrismaClient, User } from "@prisma/client";

interface CreateUserRequest {
  name: string;
  cpf: string;
  password: string;
}

export class CreateUser {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ password, ...data }: CreateUserRequest): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        hashedPassword,
        isAdmin: false,
      },
    });
    return user;
  }
}
