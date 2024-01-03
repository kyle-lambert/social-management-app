import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

const buttonStyles = cva("", {
  variants: {
    appearance: {
      primary: "",
      secondary: "",
      ghost: "flex hover:bg-black",
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

type ButtonProps = {} & VariantProps<typeof buttonStyles> & AriaButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ appearance, size, className, ...rest }, ref) => {
    return (
      <AriaButton
        className={cn(buttonStyles({ appearance, size }), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";
