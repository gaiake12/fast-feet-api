import { FastifyInstance } from "fastify";
import { CreateUserFactory } from "../useCases/CreateUser/CreateUserFactory";
import { UpdateUserFactory } from "../useCases/UpdateUser/UpdateUserFactory";
import { DeleteUserFactory } from "../useCases/DeleteUser/DeleteUserFactory";
import { GetUserFactory } from "../useCases/GetUser/GetUserFactory";
import { ensureIsAuthenticated } from "@/shared/infra/middlewares/ensureIsAuthenticated";
import { AuthenticateUserFactory } from "../useCases/AuthenticateUser/AuthenticateUserFactory";
import { RefreshAuthTokenFactory } from "../useCases/RefreshAuthToken/RefreshAuthTokenFactory";
import { ensureAdminRole } from "@/shared/infra/middlewares/ensureAdminRole";

export const userV1Routes = (app: FastifyInstance) => {
  app.post("/auth", AuthenticateUserFactory.make);
  app.post("/refresh-token", RefreshAuthTokenFactory.make);

  app.register((app) => {
    app.addHook("preHandler", ensureIsAuthenticated);
    app.addHook("preHandler", ensureAdminRole);

    app.post("/", CreateUserFactory.make);
    app.put("/:id", UpdateUserFactory.make);
    app.delete("/:id", DeleteUserFactory.make);
    app.get("/:id", GetUserFactory.make);
  });
};
