import { z } from "zod";

const deleteUserValidator = z.object({
  id: z.uuid(),
});

type DeleteUserValidatorProps = z.infer<typeof deleteUserValidator>;

export class DeleteUserValidator {
  async validate(data: unknown): Promise<DeleteUserValidatorProps> {
    return deleteUserValidator.parseAsync(data);
  }
}
