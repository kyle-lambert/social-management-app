import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import { useDataLogger } from "~/hooks";
import { STRATEGY, authenticator } from "~/lib/services/auth.server";
import { commitSession, getSession } from "~/lib/services/session.server";
import {
  loginValidator,
  type AuthenticateLoginContext,
} from "~/lib/services/validation.server";
import { response } from "~/lib/utils/response.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.clone().formData());

  const result = await loginValidator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  try {
    const userId = await authenticator.authenticate(STRATEGY.form, request, {
      context: { formData: result.data } as AuthenticateLoginContext,
    });

    const session = await getSession(request.headers.get("Cookie"));
    session.set(authenticator.sessionKey, userId);

    return redirect("/app", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      throw response.unauthorized("Authorization error");
    }

    throw error;
  }
}

export default function () {
  useDataLogger();
  return <div>_auth.login</div>;
}
