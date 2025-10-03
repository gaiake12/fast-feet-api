import { User } from "@/shared/domain/entities/user";
import { UsersRepository } from "@/shared/infra/providers/database/adapter/UsersRepository";
import { hash } from "bcryptjs";

interface CreateUserRequest {
  name: string;
  cpf: string;
  password: string;
}

export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ password, ...data }: CreateUserRequest): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      ...data,
      hashedPassword,
      isAdmin: false,
    });
    return user;
  }
}
