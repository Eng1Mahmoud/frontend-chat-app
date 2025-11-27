import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().pipe(z.email({ message: "Enter a valid email" })),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
