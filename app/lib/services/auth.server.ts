import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/lib/services/session.server";

export const authenticator = new Authenticator<null>(sessionStorage, {
  throwOnError: true,
});

const STRATEGY = {
  form: "FORM_STRATEGY",
} as const;

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    return null;
  }),
  STRATEGY.form,
);
