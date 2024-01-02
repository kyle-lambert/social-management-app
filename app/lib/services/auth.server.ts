import { User } from "@prisma/client";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { prisma } from "~/lib/services/db.server";
import { bcrypt } from "~/lib/services/packages.server";
import { sessionStorage } from "~/lib/services/session.server";
import { AuthenticateLoginContext } from "~/lib/services/validation.server";

export type EmailTokenPayload = Pick<User, "id" | "email">;
export type ResetTokenPayload = Pick<User, "id" | "email">;

export type AuthenticatorPayload = Pick<User, "id" | "email" | "isVerified">;

export const authenticator = new Authenticator<User["id"]>(sessionStorage, {
  throwOnError: true,
});

export const STRATEGY = {
  form: "FORM_STRATEGY",
} as const;

authenticator.use(
  new FormStrategy(async ({ context }) => {
    const { formData } = context as AuthenticateLoginContext;

    const user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      },
      include: {
        password: true,
      },
    });

    if (!user || !user.password) {
      throw new AuthorizationError();
    }

    const isMatch = await bcrypt.compare(formData.password, user.password.hash);

    if (!isMatch) {
      throw new AuthorizationError();
    }

    return user.id;
  }),
  STRATEGY.form,
);
