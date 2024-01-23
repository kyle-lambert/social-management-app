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
  const { tenant } = useParams();
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<AriaSelection>(() => {
    const workspace = workspaces.find((w) => w.id === tenant);
    return new Set([workspace ? workspace.id : ""]);
  });

  const selectedWorkspace = workspaces.find((w) =>
    new Set([...selected]).has(w.id),
  );

  useEffect(() => {
    const workspace = workspaces.find((w) => w.id === tenant);
    setSelected(new Set([workspace ? workspace.id : ""]));
  }, [workspaces, tenant]);

  return (
    <AriaMenuTrigger isOpen={open} onOpenChange={setOpen}>
      <AriaButton className="flex min-h-16 w-full items-center gap-2 overflow-hidden rounded-sm border border-gray-200 px-3 py-1 outline-none data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300">
        {selectedWorkspace ? (
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <Avatar>{getInitials(selectedWorkspace.name)}</Avatar>
            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <div className="flex-1 truncate text-left text-sm font-medium text-gray-600">
                {selectedWorkspace.name}
              </div>
              <div className="flex-1 truncate text-left text-xs text-gray-400">
                workspace@example.com
              </div>
            </div>
            <Icon
              className="p-0.5 text-gray-600"
              name={open ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <div className="flex-1 truncate text-left text-sm font-medium text-gray-600">
                Select a workspace
              </div>
              <div className="flex-1 truncate text-left text-xs text-gray-400">
                3 workspaces available
              </div>
            </div>
            <Icon
              className="p-0.5 text-gray-600"
              name={open ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        )}
      </AriaButton>
      <AriaPopover className="w-[var(--trigger-width)] rounded-sm border border-gray-200 bg-white py-1 outline-none">
        <AriaMenu
          items={workspaces}
          selectionMode="single"
          selectedKeys={selected}
          disabledKeys={[...selected]}
          onSelectionChange={setSelected}
          className="outline-none"
        >
          {(w) => {
            return (
              <AriaMenuItem
                href={`/app/${w.id}`}
                className={cn(
                  "flex min-h-16 cursor-pointer items-center justify-between gap-2 overflow-hidden truncate px-3 py-1 outline-none data-[disabled]:pointer-events-none data-[hovered]:bg-gray-50",
                )}
              >
                {({ isSelected }) => (
                  <div className="flex flex-1 items-center gap-3 overflow-hidden">
                    <Avatar>{getInitials(w.name)}</Avatar>
                    <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                      <div className="flex-1 truncate text-left text-sm font-medium text-gray-600">
                        {w.name}
                      </div>
                      <div className="flex-1 truncate text-left text-xs text-gray-400">
                        workspace@example.com
                      </div>
                    </div>
                    {isSelected && (
                      <Icon
                        className="rounded-sm bg-green-100 p-0.5 text-gray-800"
                        name={"Check"}
                      />
                    )}
                  </div>
                )}
              </AriaMenuItem>
            );
          }}
        </AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  );
};
