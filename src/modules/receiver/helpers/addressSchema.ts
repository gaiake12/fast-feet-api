import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().nullable().default(null),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
});
