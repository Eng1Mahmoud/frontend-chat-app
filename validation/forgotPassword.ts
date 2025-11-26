import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
