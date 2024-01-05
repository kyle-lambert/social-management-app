import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { Icon, type IconName } from "~/components";
import { cn } from "~/lib/utils/cn";

const buttonStyles = cva(
  "flex cursor-pointer items-center justify-center rounded-sm text-center outline-none transition-colors data-[pressed]:scale-[98%] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-90 data-[focus-visible]:outline-dashed data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2  data-[focus-visible]:outline-blue-500",
  {
    variants: {
      appearance: {
        primary:
          "border-2 border-gray-800 bg-gray-800 text-gray-100 data-[focus-visible]:border-gray-900 data-[hovered]:border-gray-900 data-[focus-visible]:bg-gray-900 data-[hovered]:bg-gray-900 data-[focus-visible]:text-white  data-[hovered]:text-white",
        secondary:
          "border-2 border-orange-200 bg-orange-200 text-gray-800 data-[focus-visible]:border-orange-300 data-[hovered]:border-orange-300 data-[focus-visible]:bg-orange-300 data-[hovered]:bg-orange-300 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
        ghost:
          "border-2 border-gray-100 bg-gray-100 text-gray-600 data-[focus-visible]:border-gray-200 data-[hovered]:border-gray-200 data-[focus-visible]:bg-gray-200 data-[hovered]:bg-gray-200 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
        outline:
          "border-2 border-gray-200 bg-white text-gray-600 data-[focus-visible]:border-gray-800 data-[hovered]:border-gray-800 data-[focus-visible]:text-gray-900 data-[hovered]:text-gray-900",
      },
      size: {
        sm: "min-h-10 px-3 py-1 text-sm",
        md: "min-h-12 px-3 py-1 ",
        lg: "min-h-14 px-3 py-1 ",
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
  } & VariantProps<typeof buttonStyles> &
    Omit<AriaButtonProps, "children">
>;

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...rest },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <AriaButton
          ref={ref}
          className={cn(
            "flex items-center gap-2",
            buttonStyles({ appearance, size }),
            className,
          )}
          {...rest}
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
        className={cn(
          "flex items-center gap-2",
          buttonStyles({ appearance, size }),
          className,
        )}
        {...rest}
      >
        {children}
      </AriaButton>
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
  ({ iconStartName, iconEndName, isLoading, children, ...rest }, ref) => {
    if (isLoading) {
      return (
        <ButtonBase
          ref={ref}
          isDisabled={isLoading}
          iconEnd={<Icon name="loading" className="animate-spin" />}
          {...rest}
        >
          Loading
        </ButtonBase>
      );
    }
    return (
      <ButtonBase
        ref={ref}
        iconStart={iconStartName && <Icon name={iconStartName} />}
        iconEnd={iconEndName && <Icon name={iconEndName} />}
        children={children}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";

type ButtonLinkBaseProps = React.PropsWithChildren<
  {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  } & VariantProps<typeof buttonStyles> &
    Omit<AriaLinkProps, "children">
>;

const ButtonLinkBase = React.forwardRef<HTMLAnchorElement, ButtonLinkBaseProps>(
  (
    { iconStart, iconEnd, appearance, size, className, children, ...rest },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <AriaLink
          ref={ref}
          className={cn(
            "flex items-center gap-2",
            buttonStyles({ appearance, size }),
            className,
          )}
          {...rest}
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
        className={cn(
          "flex items-center gap-2",
          buttonStyles({ appearance, size }),
          className,
        )}
        {...rest}
      >
        {children}
      </AriaLink>
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
  ({ iconStartName, iconEndName, isLoading, children, ...rest }, ref) => {
    if (isLoading) {
      return (
        <ButtonLinkBase
          ref={ref}
          isDisabled={isLoading}
          iconEnd={<Icon name="loading" className="animate-spin" />}
          {...rest}
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
        {...rest}
      />
    );
  },
);
ButtonLink.displayName = "ButtonLink";
