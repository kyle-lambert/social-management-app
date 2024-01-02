import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

/**
 * Forgot passwort
 */
const forgotPasswordSchema = z.object({
  email: z.string().email().trim(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export const forgotPasswordValidator = withZod(forgotPasswordSchema);

/**
 * Reset password
 */
const resetPasswordSchema = z
  .object({
    id: z.string().min(1).trim(),
    token: z.string().min(1).trim(),
    password: z.string().min(1).trim(),
    confirmPassword: z.string().min(1).trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export const resetPasswordValidator = withZod(resetPasswordSchema);

/**
 * Login
 */
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

/**
 * Register
 */
const registerSchema = z
  .object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email(),
    password: z.string().min(1).trim(),
    confirmPassword: z.string().min(1).trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
export const registerValidator = withZod(registerSchema);
