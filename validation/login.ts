import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
