import { z } from "zod";

const getReceiverValidator = z.object({
  receiverId: z.uuid(),
});

type GetReceiverValidatorProps = z.infer<typeof getReceiverValidator>;

export class GetReceiverValidator {
  async validate(data: unknown): Promise<GetReceiverValidatorProps> {
    return getReceiverValidator.parseAsync(data);
  }
}
