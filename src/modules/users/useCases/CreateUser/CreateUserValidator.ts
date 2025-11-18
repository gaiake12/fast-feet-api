import { z } from "zod";

const createUserValidator = z.object({
  name: z.string().min(1),
  cpf: z.string().length(11),
  password: z.string().min(1),
});

type CreateUserValidatorProps = z.infer<typeof createUserValidator>;

export class CreateUserValidator {
  async validate(data: unknown): Promise<CreateUserValidatorProps> {
    return createUserValidator.parseAsync(data);
  }
}
