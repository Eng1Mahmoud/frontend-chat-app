import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Min 3 characters" })
    .max(30, { message: "Max 30 characters" }),
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

export type SignupInput = z.infer<typeof signupSchema>;
