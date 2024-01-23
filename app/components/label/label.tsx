import React from "react";
import {
  Label as AriaLabel,
  type LabelProps as AriaLabelProps,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

export type LabelProps = {} & AriaLabelProps;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaLabel
        ref={ref}
        className={cn("text-sm font-medium text-gray-800", className)}
        {...props}
      />
    );
  },
);
Label.displayName = "Label";
