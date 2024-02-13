import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "~/lib/utils/cn";

const avatarStyles = cva(
  "flex flex-shrink-0 items-center justify-center bg-red-900 font-semibold uppercase text-white",
  {
    variants: {
      size: {
        sm: "h-8 w-8 rounded-sm text-xs",
        md: "h-10 w-10 rounded text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = React.PropsWithChildren<{}> &
  VariantProps<typeof avatarStyles>;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, ...props }, ref) => {
    return <div ref={ref} className={cn(avatarStyles({ size }))} {...props} />;
  },
);
Avatar.displayName = "Avatar";
