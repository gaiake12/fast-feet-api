import { isPast, addDays } from "date-fns";
import { PrismaClient } from "@prisma/client";

import { AppError } from "@/shared/errors/AppError";
import { JWTProvider } from "@/shared/infra/providers/JWTProvider/models/JWTProvider";
import { authConfig } from "@/config/authConfig";

interface RefreshAuthTokenRequest {
  refreshToken: string;
}

interface RefreshAuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export class RefreshAuthToken {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtProvider: JWTProvider
  ) {}

  async execute(
    data: RefreshAuthTokenRequest
  ): Promise<RefreshAuthTokenResponse> {
    const refreshTokenPayload = await this.jwtProvider.verify(
      data.refreshToken
    );

    if (!refreshTokenPayload) {
      throw new AppError({ message: "Invalid refresh token", statusCode: 401 });
    }

    const userId = refreshTokenPayload.sub;

    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId,
      },
      select: {
        expiresAt: true,
      },
    });

    if (!refreshToken) {
      throw new AppError({
        message: "Refresh token not found",
        statusCode: 401,
      });
    }

    if (isPast(refreshToken.expiresAt)) {
      throw new AppError({ message: "Refresh token expired", statusCode: 401 });
    }

    const { jwt: jwtConfig, refreshToken: refreshTokenConfig } = authConfig;

    const newAccessToken = await this.jwtProvider.sign({
      sub: userId,
      exp: addDays(new Date(), jwtConfig.expiresIn).getTime(),
      iat: new Date().getTime(),
    });

    const newRefreshToken = await this.jwtProvider.sign({
      sub: userId,
      exp: addDays(new Date(), refreshTokenConfig.expiresIn).getTime(),
      iat: new Date().getTime(),
    });

    await this.prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        token: newRefreshToken,
        expiresAt: addDays(new Date(), refreshTokenConfig.expiresIn),
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
