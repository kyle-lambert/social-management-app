import { type LoaderFunctionArgs } from "@remix-run/node";
import { WorkspaceSwitcher } from "~/components";
import { useDataLogger } from "~/hooks";

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

const workspaces = [
  {
    id: "aaa",
    name: "Workspace AAA",
  },
  {
    id: "bbb",
    name: "Workspace BBB",
  },
  {
    id: "ccc",
    name: "Workspace CCC",
  },
];

export default function () {
  useDataLogger();
  return (
    <div className="p-4">
      <WorkspaceSwitcher items={workspaces} />
    </div>
  );
}
