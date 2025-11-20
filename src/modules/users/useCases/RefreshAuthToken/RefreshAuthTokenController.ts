import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshAuthToken } from "./RefreshAuthToken";

export class RefreshAuthTokenController {
  constructor(private readonly refreshAuthTokenUseCase: RefreshAuthToken) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return response.status(401).send({
        message: "Refresh token not found",
      });
    }

    console.log("refreshToken", refreshToken);

    const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
      await this.refreshAuthTokenUseCase.execute({
        refreshToken,
      });

    return response
      .setCookie("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .send({
        accessToken: newAccessToken,
      });
  }
}
