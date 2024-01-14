import { useEffect, useState } from "react";
import {
  MenuTrigger as AriaMenuTrigger,
  Button as AriaButton,
  Popover as AriaPopover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type Selection as AriaSelection,
} from "react-aria-components";
import { Avatar, Icon } from "~/components";
import { cn } from "~/lib/utils/cn";

type WorkspaceDropdownProps<TIdentifier extends string> = {
  items: Array<{
    id: TIdentifier;
    name: string;
  }>;
  selectedId?: TIdentifier;
};

export const WorkspaceDropdown = <TIdentifier extends string>({
  items,
  selectedId,
}: WorkspaceDropdownProps<TIdentifier>) => {
  const [selectedKey, setSelectedKey] = useState<AriaSelection>(() => {
    const workspace = items.find((w) => w.id === selectedId);
    return new Set([workspace ? workspace.id : ""]);
  });
  const [open, setOpen] = useState(false);

  const selectedWorkspace = items.find((w) =>
    new Set([...selectedKey]).has(w.id),
  );

  useEffect(() => {
    const workspace = items.find((w) => w.id === selectedId);
    setSelectedKey(new Set([workspace ? workspace.id : ""]));
  }, [selectedId, items]);

  return (
    <AriaMenuTrigger isOpen={open} onOpenChange={setOpen}>
      <AriaButton className="flex min-h-16 w-full shrink-0 items-center justify-between gap-2 overflow-hidden rounded border border-gray-200 px-3 py-3 outline-none">
        {selectedWorkspace ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar>MS</Avatar>
            <div className="flex flex-col overflow-hidden">
              <div className="flex-1 truncate text-left text-sm font-medium text-gray-600">
                {selectedWorkspace.name}
              </div>
              <div className="flex-1 truncate text-left text-xs text-gray-400">
                workspace@example.com
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-hidden">
            <div className="flex-1 truncate text-sm font-medium text-gray-600">
              Choose a workspace
            </div>
          </div>
        )}
        <Icon
          className="text-gray-600"
          name={open ? "ChevronUp" : "ChevronDown"}
        />
      </AriaButton>
      <AriaPopover className="w-[var(--trigger-width)] rounded border border-gray-200 py-1 shadow-sm outline-none">
        <AriaMenu
          selectionMode="single"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          items={items}
          className="outline-none"
        >
          {(item) => {
            return (
              <AriaMenuItem
                // href={`/app/${item.id}`}
                className={cn(
                  "flex min-h-14 w-full shrink-0 cursor-pointer items-center justify-between gap-2 overflow-hidden truncate px-3 py-3 outline-none data-[hovered]:bg-gray-50",
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar>MS</Avatar>
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 truncate text-sm font-medium text-gray-600">
                      {item.name}
                    </div>
                    <div className="flex-1 truncate text-xs text-gray-400">
                      workspace@example.com
                    </div>
                  </div>
                </div>
              </AriaMenuItem>
            );
          }}
        </AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  );
};
