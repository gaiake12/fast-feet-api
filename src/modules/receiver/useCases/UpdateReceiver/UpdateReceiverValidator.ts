import { z } from "zod";
import { addressSchema } from "../../helpers/addressSchema";

const updateReceiverValidator = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  address: addressSchema,
});

type UpdateReceiverValidatorProps = z.infer<typeof updateReceiverValidator>;

export class UpdateReceiverValidator {
  async validate(data: unknown): Promise<UpdateReceiverValidatorProps> {
    return updateReceiverValidator.parseAsync(data);
  }
}
