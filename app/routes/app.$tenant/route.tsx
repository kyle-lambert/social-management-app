import { type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { WorkspaceDropdown } from "~/components/workspace-dropdown";

import logo from "../../../public/logoipsum.svg";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log("TENANT:", params?.tenant);
  return {};
}

export default function () {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex w-80 flex-col border-r border-gray-200">
        <div className="flex h-20 items-center p-3">
          <img src={logo} alt="" className="h-9" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="p-3">
            <WorkspaceDropdown
              workspaces={[
                { id: "w1", name: "Workspace 1" },
                { id: "w2", name: "Workspace 2" },
                { id: "w3", name: "Workspace 3" },
              ]}
            />
          </div>
          <div className="flex-1 border-b border-gray-200 p-3">nav</div>
          <div className="p-3">bottom nav</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-50">
        <div className="h-20 border-b border-gray-200 p-3">topbar</div>
        <div className="flex-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
