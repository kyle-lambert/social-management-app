import { forwardRef } from "react";
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  FieldError as AriaFieldError,
  type FieldErrorProps as AriaFieldErrorProps,
  type LabelProps as AriaLabelProps,
  type TextFieldProps as AriaTextFieldProp,
} from "react-aria-components";

import { cn } from "~/lib/utils/cn";

import { Input, type InputProps } from "~/components";

type FieldProps = {} & Omit<AriaTextFieldProp, "className">;
export const Field = ({ ...props }: FieldProps) => {
  return <AriaTextField className={cn("space-y-1")} {...props} />;
};
Field.displayName = "Field";

type FieldLabelProps = {} & AriaLabelProps;
const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaLabel
        ref={ref}
        className={cn("block text-sm font-medium text-gray-600", className)}
        {...props}
      />
    );
  },
);
FieldLabel.displayName = "FieldLabel";

type FieldInputProps = InputProps;
const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ ...props }, ref) => {
    return <Input ref={ref} {...props} />;
  },
);
FieldInput.displayName = "FieldInput";

type FieldErrorProps = AriaFieldErrorProps;
const FieldError = forwardRef<HTMLElement, FieldErrorProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaFieldError
        ref={ref}
        className={cn("block text-xs text-red-600", className)}
        {...props}
      />
    );
  },
);
FieldError.displayName = "FieldError";

Field.Label = FieldLabel;
Field.Input = FieldInput;
Field.Error = FieldError;
