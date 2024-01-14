import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { useIsSubmitting } from "remix-validated-form";
import { Icon, type IconName } from "~/components";
import { cn } from "~/lib/utils/cn";

const buttonStyles = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-sm border border-transparent leading-5 outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-200 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400 data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-800",
  {
    variants: {
      appearance: {
        primary:
          "bg-gray-800 text-white data-[focus-visible]:bg-gray-900 data-[hovered]:bg-gray-900",
        secondary:
          "bg-stone-200 text-gray-800 data-[focus-visible]:bg-stone-300 data-[hovered]:bg-stone-300",
        tertiary:
          "border border-gray-200 text-gray-600 shadow-sm data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300",
        error:
          "border border-gray-200 text-red-700 shadow-sm data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300 data-[focus-visible]:bg-gray-50 data-[hovered]:bg-gray-50",
        success:
          "border border-gray-200 text-lime-700 shadow-sm data-[focus-visible]:border-gray-300 data-[hovered]:border-gray-300 data-[focus-visible]:bg-gray-50 data-[hovered]:bg-gray-50",
      },
      size: {
        sm: "min-h-10 px-3 py-1 text-sm",
        md: "min-h-11 px-3 py-1 ",
        lg: "min-h-12 px-3 py-1 ",
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
    { iconStart, iconEnd, appearance, size, className, children, ...props },
    ref,
  ) => {
    if (iconStart || iconEnd) {
      return (
        <AriaButton
          ref={ref}
          className={cn(
            "flex items-center gap-1.5",
            buttonStyles({ appearance, size }),
            className,
          )}
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
        className={cn(
          "flex items-center gap-1.5",
          buttonStyles({ appearance, size }),
          className,
        )}
        {...props}
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
  ({ iconStartName, iconEndName, isLoading, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <ButtonBase
          ref={ref}
          isDisabled={isLoading}
          iconEnd={<Icon name="Loading" className="animate-spin" />}
          {...props}
        >
          Loading...
        </ButtonBase>
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

type ButtonSubmitProps = {
  formId?: string;
} & ButtonProps;
export const ButtonSubmit = React.forwardRef<
  HTMLButtonElement,
  ButtonSubmitProps
>(({ type = "submit", formId, ...props }, ref) => {
  const isSubmitting = useIsSubmitting(formId);
  return <Button ref={ref} type={type} isLoading={isSubmitting} {...props} />;
});
ButtonSubmit.displayName = "ButtonSubmit";

type ButtonLinkBaseProps = React.PropsWithChildren<
  {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  } & VariantProps<typeof buttonStyles> &
    Omit<AriaLinkProps, "children">
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
          className={cn(
            "flex items-center gap-2",
            buttonStyles({ appearance, size }),
            className,
          )}
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
        className={cn(
          "flex items-center gap-2",
          buttonStyles({ appearance, size }),
          className,
        )}
        {...props}
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
  ({ iconStartName, iconEndName, isLoading, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <ButtonLinkBase
          ref={ref}
          isDisabled={isLoading}
          iconEnd={<Icon name="Loading" className="animate-spin" />}
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
