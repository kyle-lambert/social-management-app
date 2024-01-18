import { type LoaderFunctionArgs } from "@remix-run/node";
import { WorkspaceDropdown } from "~/components";

export async function loader({ request, params }: LoaderFunctionArgs) {
  // const tenantId = params.tenant as string;
  // const userId = await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/login",
  // });

  return null;
}
//   const tenantMembership = await prisma.tenantMembership.findUnique({
//     where: {
//       userId_tenantId: {
//         userId,
//         tenantId,
//       },
//     },
//     include: {
//       user: {
//         include: {
//           tenants: {
//             include: {
//               tenant: true,
//             },
//           },
//         },
//       },
//       tenant: true,
//       role: true,
//     },
//   });

//   if (!tenantMembership) {
//     throw response.notFound("userTenant not found");
//   }

//   const { user, tenant, role } = tenantMembership;
//   const { tenants } = user;

//   return json({
//     user,
//     tenant,
//     role,
//     tenants,
//   });
// }

export default function () {
  return (
    <div className="p-6">
      <div className="flex w-1/3 gap-8">
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
      </div>
    </div>
  );
}
