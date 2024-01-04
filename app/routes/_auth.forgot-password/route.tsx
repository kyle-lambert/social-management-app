import { validationError } from "remix-validated-form";
import { useDataLogger } from "~/hooks";
import { prisma } from "~/lib/services/db.server";
import { jwt } from "~/lib/services/packages.server";
import { forgotPasswordValidator } from "~/lib/services/validation.server";
import { response } from "~/lib/utils/response.server";

import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const result = await forgotPasswordValidator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
    include: {
      password: true,
    },
  });

  if (!user || !user.password) {
    return response.notFound("");
  }

  const { id, email } = user;

  try {
    const secret = `${user.password.hash}-${user.createdAt.getTime()}`;
    const token = jwt.sign({ id, email }, secret, {
      expiresIn: "30m",
    });

    // Send this link in reset password email
    const link = `${new URL(request.url).origin}/reset-password/${id}/${token}`;

    return { link };
  } catch (error) {
    return response.serverError("");
  }
}

export default function () {
  useDataLogger();

  return <div>forgot password</div>;
}
