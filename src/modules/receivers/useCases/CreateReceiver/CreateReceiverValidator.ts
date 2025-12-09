import { z } from "zod";
import { addressSchema } from "../../helpers/addressSchema";

const createReceiverValidator = z.object({
  name: z.string().min(1),
  email: z.email(),
  address: addressSchema,
});

type CreateReceiverValidatorProps = z.infer<typeof createReceiverValidator>;

export class CreateReceiverValidator {
  async validate(data: unknown): Promise<CreateReceiverValidatorProps> {
    return createReceiverValidator.parseAsync(data);
  }
}
