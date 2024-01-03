import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useDataLogger } from "~/hooks";
import { authenticator } from "~/lib/services/auth.server";
import { prisma } from "~/lib/services/db.server";
import { response } from "~/lib/utils/response.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const tenantId = params.tenant as string;
  const userId = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const tenantMembership = await prisma.tenantMembership.findUnique({
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

  if (!tenantMembership) {
    throw response.notFound("userTenant not found");
  }

  const { user, tenant, role } = tenantMembership;
  const { tenants } = user;

  return json({
    user,
    tenant,
    role,
    tenants,
  });
}

export default function () {
  useDataLogger();
  return <div>app.$tenant</div>;
}
