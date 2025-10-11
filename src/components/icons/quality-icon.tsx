import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { getQualityIcon } from "@/lib/quality-icons";
import { cn } from "@/lib/utils";

interface QualityIconProps extends React.ComponentPropsWithoutRef<"div"> {
  quality: string;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const QualityIcon = React.forwardRef<HTMLDivElement, QualityIconProps>(
  ({ quality, size = "md", asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const Icon = getQualityIcon(quality);

    if (!Icon) return null;

    return (
      <Comp
        ref={ref}
        data-quality={quality}
        data-size={size}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <Icon className={cn(sizeClasses[size])} />
      </Comp>
    );
  }
);

QualityIcon.displayName = "QualityIcon";

export { QualityIcon };
export type { QualityIconProps };
