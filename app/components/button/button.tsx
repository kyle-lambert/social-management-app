import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import {
  Button as AriaButton,
  Link as AriaLink,
  type ButtonProps as AriaButtonProps,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";

import { cn } from "~/lib/utils/cn";
import { Icon, type IconName } from "~/components/icon";

const buttonStyles = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden text-ellipsis text-nowrap rounded-md border border-transparent font-medium leading-5 outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500",
  {
    variants: {
      appearance: {
        primary:
          "bg-gray-900 text-white data-[focus-visible]:bg-gray-950 data-[hovered]:bg-gray-950",
        secondary:
          "border-indigo-300 bg-indigo-200 text-gray-900 data-[focus-visible]:border-indigo-400 data-[hovered]:border-indigo-400 data-[focus-visible]:bg-indigo-300 data-[hovered]:bg-indigo-300",
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
  } & Omit<AriaButtonProps, keyof VariantProps<typeof buttonStyles>> &
    VariantProps<typeof buttonStyles>
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...props },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <AriaButton
          ref={ref}
          className={cn(buttonStyles({ appearance, size }), className)}
          {...props}
        >
          {Boolean(iconStart) && iconStart}
          {children}
          {Boolean(iconEnd) && iconEnd}
        </AriaButton>
      );
    }

    return (
      <AriaButton
        ref={ref}
        className={cn(buttonStyles({ appearance, size }), className)}
        children={children}
        {...props}
      />
    );
  },
);
ButtonBase.displayName = "ButtonBase";

export type ButtonProps = {
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
  } & Omit<AriaLinkProps, keyof VariantProps<typeof buttonStyles>> &
    VariantProps<typeof buttonStyles>
>;

const ButtonLinkBase = React.forwardRef<HTMLAnchorElement, ButtonLinkBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...props },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <AriaLink
          ref={ref}
          className={cn(buttonStyles({ appearance, size }), className)}
          {...props}
        >
          {Boolean(iconStart) && iconStart}
          {children}
          {Boolean(iconEnd) && iconEnd}
        </AriaLink>
      );
    }

    return (
      <AriaLink
        ref={ref}
        className={cn(buttonStyles({ appearance, size }), className)}
        children={children}
        {...props}
      />
    );
  },
);
ButtonLinkBase.displayName = "ButtonLinkBase";

export type ButtonLinkProps = {
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
