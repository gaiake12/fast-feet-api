import { CreateUserFactory } from "@/modules/users/useCases/CreateUser/CreateUserFactory";
import { AuthenticateUserFactory } from "@/modules/users/useCases/AuthenticateUser/AuthenticateUserFactory";
import { FastifyInstance } from "fastify";
import { RefreshAuthTokenFactory } from "@/modules/users/useCases/RefreshAuthToken/RefreshAuthTokenFactory";

export const v1Routes = (app: FastifyInstance) => {
  app.post("/users", CreateUserFactory.make);
  app.post("/auth", AuthenticateUserFactory.make);
  app.post("/refresh-token", RefreshAuthTokenFactory.make);
};
