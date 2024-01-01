import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1).trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export const loginValidator = withZod(loginSchema);
export type AuthenticateLoginContext = Record<
  "formData",
  z.infer<typeof loginSchema>
>;
