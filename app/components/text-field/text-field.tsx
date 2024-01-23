import React from "react";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

export type TextFieldProps = {} & AriaTextFieldProps;

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaTextField
        ref={ref}
        className={cn("flex flex-col gap-1.5", className)}
        {...props}
      />
    );
  },
);
TextField.displayName = "TextField";
