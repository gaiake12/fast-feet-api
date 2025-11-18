import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUserValidator } from "./AuthenticateUserValidator";
import { AuthenticateUser } from "./AuthenticateUser";

export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUser,
    private readonly authenticateUserValidator: AuthenticateUserValidator
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const data = await this.authenticateUserValidator.validate(request.body);

    const authenticateUserResponse =
      await this.authenticateUserUseCase.execute(data);

    const { refreshToken, ...res } = authenticateUserResponse;
    return response
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .send(res);
  }
}
