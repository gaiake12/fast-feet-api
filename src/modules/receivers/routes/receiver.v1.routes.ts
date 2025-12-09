import { FastifyInstance } from "fastify";
import { ensureAdminRole } from "@/shared/infra/middlewares/ensureAdminRole";
import { ensureIsAuthenticated } from "@/shared/infra/middlewares/ensureIsAuthenticated";
import { CreateReceiverFactory } from "../useCases/CreateReceiver/CreateReceiverFactory";
import { DeleteReceiverFactory } from "../useCases/DeleteReceiver/DeleteReceiverFactory";
import { UpdateReceiverFactory } from "../useCases/UpdateReceiver/UpdateReceiverFactory";
import { GetReceiverFactory } from "../useCases/GetReceiver/GetReceiverFactory";

export const receiverV1Routes = async (app: FastifyInstance) => {
  app.addHook("preHandler", ensureIsAuthenticated);
  app.addHook("preHandler", ensureAdminRole);

  app.post("/", CreateReceiverFactory.make);
  app.put("/:receiverId", UpdateReceiverFactory.make);
  app.delete("/:receiverId", DeleteReceiverFactory.make);
  app.get("/:receiverId", GetReceiverFactory.make);
};
