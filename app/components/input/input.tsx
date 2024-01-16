import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
} from "react-aria-components";

const inputStyles = cva(
  "w-full rounded-sm border border-gray-200 bg-white leading-5 text-gray-800 placeholder-gray-400 outline-none transition-colors hover:border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 data-[focus-visible]:border-gray-400 data-[focused]:border-gray-400",
  {
    variants: {
      appearance: {
        success: "border-lime-700",
        error: "border-red-700",
      },
      size: {
        sm: "h-10 px-3 py-1 text-sm",
        md: "h-11 px-3 py-1",
        lg: "h-12 px-3 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputProps = {} & Omit<AriaInputProps, "className" | "size"> &
  VariantProps<typeof inputStyles>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ appearance, size, ...props }, ref) => {
    return (
      <AriaInput
        className={inputStyles({ appearance, size })}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
