import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email(),
    password: z.string().min(1).trim(),
    confirmPassword: z.string().min(1).trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "'Password' and 'Confirm Password' must be identical",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
export const registerValidator = withZod(registerSchema);
