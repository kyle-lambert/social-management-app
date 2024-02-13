import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  MenuTrigger as AriaMenuTrigger,
  Button as AriaButton,
  Popover as AriaPopover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type Selection as AriaSelection,
} from "react-aria-components";

import { Avatar } from "~/components/avatar";
import { Icon } from "~/components/icon";

import { cn } from "~/lib/utils/cn";
import { getInitials } from "~/lib/utils/helpers";

type WorkspaceDropdownProps = {
  workspaces: Array<{
    id: string;
    name: string;
  }>;
};

export const WorkspaceDropdown = ({ workspaces }: WorkspaceDropdownProps) => {
  const params = useParams();

  const [selected, setSelected] = useState<AriaSelection>(() => {
    const workspace = workspaces.find((w) => w.id === params?.workspace);
    return new Set([workspace ? workspace.id : ""]);
  });

  const selectedWorkspace = workspaces.find((w) =>
    new Set([...selected]).has(w.id),
  );

  useEffect(() => {
    const workspace = workspaces.find((w) => w.id === params?.workspace);
    setSelected(new Set([workspace ? workspace.id : ""]));
  }, [workspaces, params?.workspace]);

  return (
    <AriaMenuTrigger>
      {selectedWorkspace ? (
        <AriaButton className="flex min-h-16 w-full items-center gap-2 overflow-hidden rounded-lg bg-gray-50 px-3 py-1 outline-none transition-colors data-[hovered]:bg-gray-100 data-[focus-visible]:outline data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-blue-800">
          <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
            <Avatar>{getInitials(selectedWorkspace.name)}</Avatar>
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 truncate text-left text-sm font-medium text-gray-900">
                {selectedWorkspace.name}
              </div>
              <div className="flex-1 truncate text-left text-xs text-gray-800">
                workspace@example.com
              </div>
            </div>
            <Icon className="p-0.5 text-gray-900" name="ChevronDown" />
          </div>
        </AriaButton>
      ) : (
        <AriaButton className="flex min-h-16 w-full items-center gap-2 overflow-hidden rounded-lg bg-gray-50 px-3 py-1 outline-none transition-colors data-[hovered]:bg-gray-100 data-[focus-visible]:outline data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-blue-800">
          <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 truncate text-left text-sm font-medium text-gray-900">
                Select a workspace
              </div>
              <div className="flex-1 truncate text-left text-xs text-gray-800">
                3 workspaces available
              </div>
            </div>
            <Icon className="p-0.5 text-gray-900" name="ChevronDown" />
          </div>
        </AriaButton>
      )}
      <AriaPopover className="w-[var(--trigger-width)] rounded-lg bg-white p-2 shadow-2xl outline-none">
        <AriaMenu
          items={workspaces}
          selectionMode="single"
          selectedKeys={selected}
          disabledKeys={[...selected]}
          onSelectionChange={setSelected}
          className="flex flex-col gap-y-1.5 outline-none"
        >
          {(w) => {
            return (
              <AriaMenuItem
                // href={`/app/${params?.tenant}/${w.id}`}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 overflow-hidden truncate rounded bg-white px-2 py-2.5 outline-none transition-colors data-[disabled]:pointer-events-none data-[hovered]:bg-gray-100 data-[selected]:bg-stone-200 data-[focus-visible]:outline data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-blue-800",
                )}
              >
                {({ isSelected }) => {
                  return (
                    <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
                      <Avatar size="sm">{getInitials(w.name)}</Avatar>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex-1 truncate text-left text-sm font-medium text-gray-900">
                          {w.name}
                        </div>
                        <div className="flex-1 truncate text-left text-xs text-gray-800">
                          workspace@example.com
                        </div>
                      </div>
                      {/* {isSelected && (
                        <Icon className="text-gray-900" name="Check" />
                      )} */}
                    </div>
                  );
                }}
              </AriaMenuItem>
            );
          }}
        </AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  );
};
