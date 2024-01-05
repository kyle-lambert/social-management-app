import React from "react";
import { Check } from "~/components/icon/check";
import { ChevronBackwards } from "~/components/icon/chevron-backwards";
import { ChevronDoubleBackwards } from "~/components/icon/chevron-double-backward";
import { ChevronDoubleDown } from "~/components/icon/chevron-double-down";
import { ChevronDoubleForwards } from "~/components/icon/chevron-double-forward";
import { ChevronDoubleUp } from "~/components/icon/chevron-double-up";
import { ChevronDown } from "~/components/icon/chevron-down";
import { ChevronForwards } from "~/components/icon/chevron-forwards";
import { ChevronUp } from "~/components/icon/chevron-up";
import { Home } from "~/components/icon/home";
import { Loading } from "~/components/icon/loading";
import { Search } from "~/components/icon/search";
import { Settings } from "~/components/icon/settings";
import { SettingsAlt } from "~/components/icon/settings-alt";

import { cn } from "~/lib/utils/cn";

const icons = {
  Check,
  ChevronBackwards,
  ChevronDoubleBackwards,
  ChevronDoubleDown,
  ChevronDoubleForwards,
  ChevronDoubleUp,
  ChevronDown,
  ChevronForwards,
  ChevronUp,
  Home,
  Loading,
  Search,
  Settings,
  SettingsAlt,
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className }: IconProps) => {
  return icons[name] ? (
    <div
      className={cn(
        "inline-flex flex-shrink-0 items-center justify-center",
        className,
      )}
    >
      {React.createElement(icons[name])}
    </div>
  ) : null;
};
