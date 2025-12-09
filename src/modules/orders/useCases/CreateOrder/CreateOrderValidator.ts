import { z } from "zod";

const createOrderValidator = z.object({
  receiverId: z.uuid(),
  deliveryPersonId: z.uuid(),
});

type CreateOrderValidatorProps = z.infer<typeof createOrderValidator>;

export class CreateOrderValidator {
  async validate(data: unknown): Promise<CreateOrderValidatorProps> {
    return createOrderValidator.parseAsync(data);
  }
}
