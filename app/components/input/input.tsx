import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "~/lib/utils/cn";

const inputStyles = cva(
  "placeholder:gray-400 w-full rounded-sm border border-gray-200 bg-white leading-5 text-gray-800 outline-none transition-colors hover:border-gray-300 focus:border-gray-300 focus-visible:border-gray-300 disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
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
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof VariantProps<typeof inputStyles>
> &
  VariantProps<typeof inputStyles>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, appearance, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputStyles({ appearance, size }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
