import { z } from "zod";

const deleteReceiverValidator = z.object({
  receiverId: z.uuid(),
});

type DeleteReceiverValidatorProps = z.infer<typeof deleteReceiverValidator>;

export class DeleteReceiverValidator {
  async validate(data: unknown): Promise<DeleteReceiverValidatorProps> {
    return deleteReceiverValidator.parseAsync(data);
  }
}
