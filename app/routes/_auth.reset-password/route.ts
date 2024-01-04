import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import type { ResetTokenPayload } from "~/lib/services/auth.server";
import { prisma } from "~/lib/services/db.server";
import { bcrypt, jwt } from "~/lib/services/packages.server";
import { resetPasswordValidator } from "~/lib/services/validation.server";
import { response } from "~/lib/utils/response.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const result = await resetPasswordValidator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { id, token, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      password: true,
    },
  });

  if (!user || !user.password) {
    return redirect("/forgot-password");
  }

  try {
    const secret = `${user.password.hash}-${user.createdAt.getTime()}`;
    const payload = jwt.verify(token, secret) as ResetTokenPayload;

    await prisma.password.update({
      where: {
        userId: payload.id,
      },
      data: {
        hash: await bcrypt.hash(password, 10),
      },
    });

    // Email user there password has been successfully changed
  } catch (error) {
    return response.serverError("");
  }
}
