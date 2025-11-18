import { compare } from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { JWTProvider } from "@/shared/infra/providers/JWTProvider/models/JWTProvider";

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

    const accessToken = await this.jwtProvider.sign({
      sub: user.id,
      exp: new Date().getTime() + 1000 * 60 * 60 * 24, // 1 day
      iat: new Date().getTime(),
    });

    const refreshToken = await this.jwtProvider.sign({
      sub: user.id,
      exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
      iat: new Date().getTime(),
    });

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days
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
