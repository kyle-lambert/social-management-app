import React from "react";
import {
  FieldError as AriaFieldError,
  type FieldErrorProps as AriaFieldErrorProps,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

export type FieldErrorProps = {} & AriaFieldErrorProps;

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({ className, ...props }, ref) => {
  return (
    <AriaFieldError
      ref={ref}
      className={cn("text-xs text-red-700", className)}
      {...props}
    />
  );
});
FieldError.displayName = "FieldError";
