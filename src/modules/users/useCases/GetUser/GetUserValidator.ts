import { z } from "zod";

const getUserValidator = z.object({
  id: z.uuid(),
});

type GetUserValidatorProps = z.infer<typeof getUserValidator>;

export class GetUserValidator {
  async validate(data: unknown): Promise<GetUserValidatorProps> {
    return getUserValidator.parseAsync(data);
  }
}
