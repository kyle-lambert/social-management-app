import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { EmailTokenPayload } from "~/lib/services/auth.server";
import { prisma } from "~/lib/services/db.server";
import { jwt } from "~/lib/services/packages.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const token = params.token as string;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return { message: "Token is either or invalid" };
  }

  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const token = params.token as string;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as EmailTokenPayload;

    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        isVerified: true,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { message: "Token is expired" };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { message: "Token is malformed" };
    }
    return { message: "Server error" };
  }

  return null;
}
