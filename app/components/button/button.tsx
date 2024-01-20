import { Link, type LinkProps } from "@remix-run/react";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

import { Icon, type IconName } from "~/components";
import { cn } from "~/lib/utils/cn";

const buttonStyles = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden text-ellipsis text-nowrap rounded-sm border border-transparent leading-5 outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500",
  {
    variants: {
      appearance: {
        primary:
          "bg-gray-800 text-white data-[focus-visible]:bg-gray-900 data-[hovered]:bg-gray-900",
        secondary:
          "bg-stone-200 text-gray-800 data-[focus-visible]:bg-stone-300 data-[hovered]:bg-stone-300",
        tertiary:
          "bg-gray-100 text-gray-800 data-[focus-visible]:bg-gray-200 data-[hovered]:bg-gray-200",
        outline:
          "border border-gray-200 text-gray-700 data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300",
        invalid:
          "border border-gray-200 text-red-700 data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300",
        valid:
          "border border-gray-200 text-lime-700 data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300",
      },
      size: {
        sm: "min-h-11 px-3 py-1",
        md: "min-h-12 px-3 py-1",
        lg: "min-h-14 px-3 py-1",
      },
    },
    defaultVariants: {
      appearance: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = React.PropsWithChildren<
  {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof VariantProps<typeof buttonStyles>
  > &
    VariantProps<typeof buttonStyles>
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...props },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <button
          ref={ref}
          className={cn(buttonStyles({ appearance, size }), className)}
          {...props}
        >
          {Boolean(iconStart) && iconStart}
          {children}
          {Boolean(iconEnd) && iconEnd}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ appearance, size }), className)}
        children={children}
        {...props}
      />
    );
  },
);
ButtonBase.displayName = "ButtonBase";

type ButtonProps = {
  iconStartName?: IconName;
  iconEndName?: IconName;
  isLoading?: boolean;
} & Omit<ButtonBaseProps, "iconStart" | "iconEnd">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ iconStartName, iconEndName, isLoading, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <ButtonBase
          ref={ref}
          className="pointer-events-none"
          iconEnd={<Icon name="Spinner" className="animate-spin-fast" />}
          {...props}
        />
      );
    }
    return (
      <ButtonBase
        ref={ref}
        iconStart={iconStartName && <Icon name={iconStartName} />}
        iconEnd={iconEndName && <Icon name={iconEndName} />}
        children={children}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

type ButtonLinkBaseProps = React.PropsWithChildren<
  {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  } & Omit<LinkProps, keyof VariantProps<typeof buttonStyles>> &
    VariantProps<typeof buttonStyles>
>;

const ButtonLinkBase = React.forwardRef<HTMLAnchorElement, ButtonLinkBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...props },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <Link
          ref={ref}
          className={cn(buttonStyles({ appearance, size }), className)}
          {...props}
        >
          {Boolean(iconStart) && iconStart}
          {children}
          {Boolean(iconEnd) && iconEnd}
        </Link>
      );
    }

    return (
      <Link
        ref={ref}
        className={cn(buttonStyles({ appearance, size }), className)}
        children={children}
        {...props}
      />
    );
  },
);
ButtonLinkBase.displayName = "ButtonLinkBase";

type ButtonLinkProps = {
  iconStartName?: IconName;
  iconEndName?: IconName;
  isLoading?: boolean;
} & Omit<ButtonLinkBaseProps, "iconStart" | "iconEnd">;

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ iconStartName, iconEndName, isLoading, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <ButtonLinkBase
          ref={ref}
          className="pointer-events-none"
          iconEnd={<Icon name="Loading" className="animate-spin-fast" />}
          {...props}
        >
          Loading
        </ButtonLinkBase>
      );
    }
    return (
      <ButtonLinkBase
        ref={ref}
        iconStart={iconStartName && <Icon name={iconStartName} />}
        iconEnd={iconEndName && <Icon name={iconEndName} />}
        children={children}
        {...props}
      />
    );
  },
);
ButtonLink.displayName = "ButtonLink";
