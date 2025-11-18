import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { v1Routes } from "./routes/v1.routes";
import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyCookie);

app.register(v1Routes, { prefix: "/v1" });
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.issues,
    });
  }

  console.log(error);
  return reply.status(500).send({ message: "Internal server error" });
});
