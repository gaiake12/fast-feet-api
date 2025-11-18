import { z } from "zod";

const authenticateUserValidator = z.object({
  cpf: z.string().length(11),
  password: z.string().min(1),
});

type AuthenticateUserValidatorProps = z.infer<typeof authenticateUserValidator>;

export class AuthenticateUserValidator {
  async validate(data: unknown): Promise<AuthenticateUserValidatorProps> {
    return authenticateUserValidator.parseAsync(data);
  }
}
