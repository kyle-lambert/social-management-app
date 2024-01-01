import React from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { cva, RecipeVariantProps } from "~/styled-system/css";

const buttonStyles = cva({
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

type ButtonProps = {} & RecipeVariantProps<typeof buttonStyles> &
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
