import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email")),
  password: z.string().min(8, { message: "Min 8 characters" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
