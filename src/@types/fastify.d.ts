import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: { id: string; isAdmin: boolean };
    body: Record<string, any>;
  }

  interface RouteGenericInterface {
    Body: Record<string, any>;
    Params: Record<string, any>;
    Querystring: Record<string, any>;
  }
}
