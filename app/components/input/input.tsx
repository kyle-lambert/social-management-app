import React from "react";
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from "react-aria-components";
import { cva, RecipeVariantProps } from "~/styled-system/css";

const inputStyles = cva({
  base: {},
  variants: {
    appearance: {
      primary: {},
      secondary: {},
      ghost: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: {
    appearance: "primary",
    size: "md",
  },
});

type InputProps = {} & RecipeVariantProps<typeof inputStyles> &
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
