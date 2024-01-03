import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";

const buttonStyles = cva("", {
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

type ButtonProps = {} & VariantProps<typeof buttonStyles> &
  Omit<AriaButtonProps, "className">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ appearance, size, ...rest }, ref) => {
    return (
      <AriaButton
        className={buttonStyles({ appearance, size })}
        ref={ref}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";
