import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
} from "react-aria-components";

import { cn } from "~/lib/utils/cn";

const inputStyles = cva(
  "placeholder:gray-400 w-full rounded-sm border border-gray-200 bg-white leading-5 text-gray-800 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:border-gray-200 data-[focus-visible]:border-gray-300 data-[focused]:border-gray-300 data-[hovered]:border-gray-300 data-[invalid]:border-red-700 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400",
  {
    variants: {
      appearance: {
        valid: "border-lime-700",
        invalid: "border-red-700",
      },
      size: {
        sm: "h-11 px-3 py-1",
        md: "h-12 px-3 py-1",
        lg: "h-14 px-3 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputProps = Omit<
  AriaInputProps,
  keyof VariantProps<typeof inputStyles>
> &
  VariantProps<typeof inputStyles>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, appearance, size, ...props }, ref) => {
    return (
      <AriaInput
        ref={ref}
        className={cn(inputStyles({ appearance, size }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
