import { compare } from "bcryptjs";
import { addDays } from "date-fns";
import { PrismaClient, User } from "@prisma/client";

import { JWTProvider } from "@/shared/infra/providers/JWTProvider/models/JWTProvider";
import { authConfig } from "@/config/authConfig";

interface AuthenticateUserRequest {
  cpf: string;
  password: string;
}

interface AuthenticateUserResponse {
  user: Pick<
    User,
    "id" | "cpf" | "name" | "isAdmin" | "createdAt" | "updatedAt"
  >;
  accessToken: string;
  refreshToken: string;
}

export class AuthenticateUser {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtProvider: JWTProvider
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
      select: {
        id: true,
        cpf: true,
        name: true,
        isAdmin: true,
        createdAt: true,
        hashedPassword: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const doesPasswordMatch = await compare(password, user.hashedPassword);

    if (!doesPasswordMatch) {
      throw new Error("Invalid password");
    }

    const currentDate = new Date();

    const accessToken = await this.jwtProvider.sign({
      sub: user.id,
      exp: addDays(currentDate, authConfig.jwt.expiresIn).getTime(),
      iat: currentDate.getTime(),
    });

    const refreshToken = await this.jwtProvider.sign({
      sub: user.id,
      exp: addDays(currentDate, authConfig.refreshToken.expiresIn).getTime(),
      iat: currentDate.getTime(),
    });

    await this.prisma.refreshToken.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        token: refreshToken,
        expiresAt: addDays(currentDate, authConfig.refreshToken.expiresIn),
      },
      update: {
        token: refreshToken,
        expiresAt: addDays(currentDate, authConfig.refreshToken.expiresIn),
      },
    });

    return {
      user: {
        id: user.id,
        cpf: user.cpf,
        name: user.name,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
  }
}
