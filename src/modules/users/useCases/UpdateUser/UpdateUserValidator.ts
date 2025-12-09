import { z } from "zod";

const updateUserValidator = z.object({
  id: z.uuid(),
  name: z.string().optional(),
  cpf: z.string().optional(),
  password: z.string().optional(),
});

type UpdateUserValidatorProps = z.infer<typeof updateUserValidator>;

export class UpdateUserValidator {
  async validate(data: unknown): Promise<UpdateUserValidatorProps> {
    return updateUserValidator.parseAsync(data);
  }
}
