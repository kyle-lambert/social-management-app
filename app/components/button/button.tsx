import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { cn } from "~/lib/utils/cn";

const buttonStyles = cva(
  "flex cursor-pointer items-center justify-center rounded-sm text-center outline-none transition-colors data-[pressed]:scale-[98%] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-300 data-[focus-visible]:ring-offset-2",
  {
    variants: {
      appearance: {
        primary:
          "border border-gray-800 bg-gray-800 text-gray-100 data-[focus-visible]:border-gray-900 data-[hovered]:border-gray-900 data-[focus-visible]:bg-gray-900 data-[hovered]:bg-gray-900 data-[focus-visible]:text-white  data-[hovered]:text-white",
        secondary:
          "border border-orange-200 bg-orange-200 text-gray-800 data-[focus-visible]:border-orange-300 data-[hovered]:border-orange-300 data-[focus-visible]:bg-orange-300 data-[hovered]:bg-orange-300 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
        tertiary:
          "border border-gray-100 bg-gray-100 text-gray-600 data-[focus-visible]:border-gray-200 data-[hovered]:border-gray-200 data-[focus-visible]:bg-gray-200 data-[hovered]:bg-gray-200 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
        outline:
          "border border-gray-200 bg-white text-gray-600 data-[focus-visible]:border-gray-600 data-[hovered]:border-gray-600 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
      },
      size: {
        sm: "min-h-9 px-3 py-1 text-sm",
        md: "min-h-10 px-4 py-1 ",
        lg: "min-h-12 px-5 py-1 ",
      },
    },
    defaultVariants: {
      appearance: "primary",
      size: "md",
    },
  },
);

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
