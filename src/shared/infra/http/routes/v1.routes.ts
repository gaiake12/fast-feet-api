import { CreateUserFactory } from "@/modules/users/useCases/CreateUser/CreateUserFactory";
import { AuthenticateUserFactory } from "@/modules/users/useCases/AuthenticateUser/AuthenticateUserFactory";
import { FastifyInstance } from "fastify";
import { RefreshAuthTokenFactory } from "@/modules/users/useCases/RefreshAuthToken/RefreshAuthTokenFactory";
import { userV1Routes } from "@/modules/users/routes/user.v1.routes";

export const v1Routes = (app: FastifyInstance) => {
  app.register(userV1Routes, { prefix: "/users" });
};
