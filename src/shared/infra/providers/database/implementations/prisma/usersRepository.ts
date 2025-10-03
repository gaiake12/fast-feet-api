import { PrismaClient } from "generated/prisma";
import { UsersRepository } from "../../adapter/UsersRepository";
import { User } from "@/shared/domain/entities/user";

export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cpf: true,
        name: true,
        hashedPassword: true,
        isAdmin: true,
      },
    });

    return user;
  }

  async findUserByDocument(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    return user;
  }

  async update(id: string, data: Omit<User, "id">): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    const udpatedUser = await this.prisma.user.update({ where: { id }, data });

    return udpatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
