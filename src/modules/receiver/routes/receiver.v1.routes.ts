import { FastifyInstance } from "fastify";
import { ensureAdminRole } from "@/shared/infra/middlewares/ensureAdminRole";
import { ensureIsAuthenticated } from "@/shared/infra/middlewares/ensureIsAuthenticated";
import { CreateReceiverFactory } from "../useCases/CreateReceiver/CreateReceiverFactory";

export const receiverV1Routes = async (app: FastifyInstance) => {
  app.addHook("preHandler", ensureIsAuthenticated);
  app.addHook("preHandler", ensureAdminRole);

  app.post("/", CreateReceiverFactory.make);
};
