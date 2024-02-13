import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { AuthorizationError } from "remix-auth";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import { Button } from "~/components/button";
import {
  Form,
  FormError,
  FormFieldController,
  FormInput,
  FormLabel,
  FormTextField,
  useForm,
} from "~/components/form";
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

const userSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().email().min(1),
});
type UserSchema = z.infer<typeof userSchema>;

const userSchemaResolver = zodResolver(userSchema);

export default function () {
  const form = useForm<UserSchema>({
    defaultValues: {
      fullName: "",
      emailAddress: "",
    },
    mode: "all",
    submitConfig: {
      method: "post",
    },
    resolver: userSchemaResolver,
  });

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full rounded-lg bg-white shadow-sm sm:max-w-lg">
        <div className="space-y-4 px-12 pb-16 pt-16">
          <h4 className="text-center text-2xl font-medium text-gray-800">
            Sign in
          </h4>
          <p className="text-center text-sm text-gray-400">
            Sunt do deserunt tempor ipsum laboris non. Eu dolore consectetur
            amet occaecat quis. Sunt nisi eiusmod deserunt id nulla consectetur
            fugiat aute consequat pariatur culpa ea.
          </p>
          <div>
            <Form {...form}>
              <div className="space-y-6">
                <FormFieldController
                  control={form.control}
                  name="fullName"
                  render={({ field, fieldState }) => (
                    <FormTextField
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      isInvalid={fieldState.invalid}
                    >
                      <FormLabel>Full name</FormLabel>
                      <FormInput ref={field.ref} />
                      <FormError />
                    </FormTextField>
                  )}
                />
                <FormFieldController
                  control={form.control}
                  name="emailAddress"
                  render={({ field, fieldState, formState }) => (
                    <FormTextField
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      isInvalid={fieldState.invalid}
                    >
                      <FormLabel>Email Address</FormLabel>
                      <FormInput ref={field.ref} />
                      <FormError />
                    </FormTextField>
                  )}
                />
                <div className="text-center text-sm text-gray-400">
                  Don't have an account? Sign in here
                </div>
                <div className="space-y-2">
                  <Button className="w-full" appearance="secondary">
                    Sign in
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
