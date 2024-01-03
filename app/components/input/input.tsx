import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from "react-aria-components";

const inputStyles = cva("", {
  variants: {
    appearance: {
      primary: "",
      secondary: "",
      ghost: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    appearance: "primary",
    size: "md",
  },
});

type InputProps = {} & VariantProps<typeof inputStyles> &
  Omit<AriaInputProps, "className">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ appearance, size, ...rest }, ref) => {
    return (
      <AriaInput
        className={inputStyles({ appearance, size })}
        ref={ref}
        {...rest}
      />
    );
  },
);
Input.displayName = "Input";
