import { z } from "zod";

const updateUserValidator = z.object({

});

type UpdateUserValidatorProps = z.infer<typeof updateUserValidator>;

export class UpdateUserValidator {
  async validate(data: unknown): Promise<UpdateUserValidatorProps> {
    return updateUserValidator.parseAsync(data);
  }
}