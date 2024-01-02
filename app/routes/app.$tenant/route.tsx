import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { authenticator } from "~/lib/services/auth.server";
import { prisma } from "~/lib/services/db.server";
import { response } from "~/lib/utils/response.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const tenantId = params.tenant as string;
  const userId = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const userTenant = await prisma.userTenant.findUnique({
    where: {
      userId_tenantId: {
        userId,
        tenantId,
      },
    },
    include: {
      user: {
        include: {
          tenants: {
            include: {
              tenant: true,
            },
          },
        },
      },
      tenant: true,
      role: true,
    },
  });

  if (!userTenant) {
    throw response.notFound("userTenant not found");
  }

  const { user, tenant, role } = userTenant;
  const { tenants } = user;

  return json({
    user,
    tenant,
    role,
    tenants,
  });
}

export default function () {
  const loaderData = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log({ loaderData });
  }, [loaderData]);

  return <div>app.$tenant</div>;
}
