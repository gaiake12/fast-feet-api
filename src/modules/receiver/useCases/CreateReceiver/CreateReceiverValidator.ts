import { z } from "zod";

const createReceiverValidator = z.object({
  name: z.string().min(1),
  email: z.email(),
  address: z.object({
    street: z.string().min(1),
    number: z.string().min(1),
    complement: z.string().optional(),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type CreateReceiverValidatorProps = z.infer<typeof createReceiverValidator>;

export class CreateReceiverValidator {
  async validate(data: unknown): Promise<CreateReceiverValidatorProps> {
    return createReceiverValidator.parseAsync(data);
  }
}
