import { useEffect, useState } from "react";
import {
  MenuTrigger as AriaMenuTrigger,
  Button as AriaButton,
  Popover as AriaPopover,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type Selection as AriaSelection,
} from "react-aria-components";
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

  const selectedWorkspace = items.find((w) =>
    new Set([...selectedKey]).has(w.id),
  );

  useEffect(() => {
    const workspace = items.find((w) => w.id === selectedId);
    setSelectedKey(new Set([workspace ? workspace.id : ""]));
  }, [selectedId, items]);

  return (
    <AriaMenuTrigger>
      <AriaButton className="inline-flex min-w-48 items-center justify-between gap-2 rounded border border-gray-300 px-3 py-2">
        <span>
          {selectedWorkspace ? selectedWorkspace.name : "Select a workspace"}
        </span>
        <span>🙏</span>
      </AriaButton>
      <AriaPopover className="w-[var(--trigger-width)]">
        <AriaMenu
          selectionMode="single"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          items={items}
          className="flex flex-col gap-3 rounded border border-gray-300 bg-white px-2 py-2"
        >
          {(item) => {
            return (
              <AriaMenuItem
                href={`/app/${item.id}`}
                className={cn(
                  "rounded-sm px-2 py-1 outline-none data-[focus-visible]:bg-gray-100 data-[hovered]:bg-gray-100",
                )}
              >
                {item.name}
              </AriaMenuItem>
            );
          }}
        </AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  );
};
