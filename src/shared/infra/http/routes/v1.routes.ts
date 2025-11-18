import { CreateUserFactory } from "@/modules/users/useCases/CreateUser/CreateUserFactory";
import { AuthenticateUserFactory } from "@/modules/users/useCases/AuthenticateUser/AuthenticateUserFactory";
import { FastifyInstance } from "fastify";

export const v1Routes = (app: FastifyInstance) => {
  app.post("/users", CreateUserFactory.make);
  app.post("/auth", AuthenticateUserFactory.make);
};
