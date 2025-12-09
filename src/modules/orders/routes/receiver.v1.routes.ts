import { FastifyInstance } from "fastify";
import { ensureAdminRole } from "@/shared/infra/middlewares/ensureAdminRole";
import { ensureIsAuthenticated } from "@/shared/infra/middlewares/ensureIsAuthenticated";

export const orderV1Routes = async (app: FastifyInstance) => {
  app.addHook("preHandler", ensureIsAuthenticated);
  app.addHook("preHandler", ensureAdminRole);

  app.post("/", CreateReceiverFactory.make);
  app.put("/:orderId", UpdateReceiverFactory.make);
  app.delete("/:orderId", DeleteReceiverFactory.make);
  app.get("/:orderId", GetReceiverFactory.make);
};
