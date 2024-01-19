import { forwardRef } from "react";
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  FieldError as AriaFieldError,
  type FieldErrorProps as AriaFieldErrorProps,
  type LabelProps as AriaLabelProps,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { Input } from "~/components";

import { cn } from "~/lib/utils/cn";

type TextFieldProps = {} & AriaTextFieldProps;
export const TextField = ({
  className,
  validationBehavior = "aria",
  ...props
}: TextFieldProps) => {
  return (
    <AriaTextField
      className={cn("flex flex-col gap-1.5", className)}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
TextField.displayName = "TextField";

type TextFieldLabelProps = {} & AriaLabelProps;
const TextFieldLabel = forwardRef<HTMLLabelElement, TextFieldLabelProps>(
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
TextFieldLabel.displayName = "TextFieldLabel";

type TextFieldErrorProps = {} & AriaFieldErrorProps;
const TextFieldError = forwardRef<HTMLElement, TextFieldErrorProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaFieldError
        ref={ref}
        className={cn("text-xs text-red-700", className)}
        {...props}
      />
    );
  },
);
TextFieldError.displayName = "TextFieldError";

TextField.Label = TextFieldLabel;
TextField.Error = TextFieldError;
TextField.Input = Input;
