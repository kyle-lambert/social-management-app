import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "~/lib/utils/cn";

const avatarStyles = cva(
  "flex items-center justify-center rounded-full bg-gray-100 font-semibold uppercase text-gray-500",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
  },
);

type AvatarProps = React.PropsWithChildren<{}> &
  VariantProps<typeof avatarStyles>;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, ...rest }, ref) => {
    return <div ref={ref} className={cn(avatarStyles({ size }))} {...rest} />;
  },
);
Avatar.displayName = "Avatar";
