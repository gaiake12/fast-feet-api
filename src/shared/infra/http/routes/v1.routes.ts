import { CreateUserFactory } from "@/modules/users/useCases/CreateUser/CreateUserFactory";
import { AuthenticateUserFactory } from "@/modules/users/useCases/AuthenticateUser/AuthenticateUserFactory";
import { FastifyInstance } from "fastify";
import { userV1Routes } from "@/modules/users/routes/user.v1.routes";
import { receiverV1Routes } from "@/modules/receivers/routes/receiver.v1.routes";
import { orderV1Routes } from "@/modules/orders/routes/receiver.v1.routes";

export const v1Routes = (app: FastifyInstance) => {
  app.register(userV1Routes, { prefix: "/users" });
  app.register(receiverV1Routes, { prefix: "/receivers" });
  app.register(orderV1Routes, { prefix: "/orders" });
};
