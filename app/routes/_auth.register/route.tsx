import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/lib/services/db.server";
import { bcrypt, jwt } from "~/lib/services/packages.server";
import { response } from "~/lib/utils/response.server";
import { registerValidator } from "~/routes/_auth.register/validation";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.clone().formData());

  const result = await registerValidator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { firstName, lastName, email, password, confirmPassword } = result.data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return response.unprocessableEntity("User exists");
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: {
        create: {
          hash: await bcrypt.hash(password, 10),
        },
      },
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const link = `${new URL(request.url).origin}/verify/${token}`;
  return { link };
}

export default function () {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    console.log({ actionData });
  }, [actionData]);

  return <div>Register</div>;
}
