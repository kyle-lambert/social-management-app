import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import type { ResetTokenPayload } from "~/lib/services/auth.server";
import { prisma } from "~/lib/services/db.server";
import { jwt } from "~/lib/services/packages.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string;
  const token = params.token as string;

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

    return { payload };
  } catch (error) {
    return redirect("/forgot-password");
  }
}
