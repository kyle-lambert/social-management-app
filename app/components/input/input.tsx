import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
} from "react-aria-components";

const inputStyles = cva(
  "w-full rounded-sm border border-gray-200 bg-white leading-5 text-gray-800 placeholder-gray-400  outline-none transition-colors  hover:border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
  {
    variants: {
      appearance: {
        success: "border-lime-600",
        error: "border-red-600",
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

type InputProps = {} & Omit<AriaInputProps, "className" | "size"> &
  VariantProps<typeof inputStyles>;

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
