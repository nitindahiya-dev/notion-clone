import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50),

  email: z
    .string()
    .email()
    .transform((email) => email.toLowerCase().trim()),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Password must contain uppercase")
    .regex(/[a-z]/, "Password must contain lowercase")
    .regex(/[0-9]/, "Password must contain a number"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLowerCase().trim()),

  password: z
    .string()
    .min(1),
});