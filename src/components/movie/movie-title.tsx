import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface MovieTitleProps extends React.ComponentPropsWithoutRef<"h3"> {
  title?: string;
  year?: number;
  size?: "sm" | "md" | "lg" | "xl";
  truncate?: boolean;
  asChild?: boolean;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-2xl",
};

const MovieTitle = React.forwardRef<HTMLHeadingElement, MovieTitleProps>(
  ({ title, year, size = "md", truncate = false, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";

    return (
      <Comp
        ref={ref}
        data-truncate={truncate}
        data-size={size}
        className={cn(
          "font-semibold leading-tight text-white",
          sizeClasses[size],
          "data-[truncate=true]:line-clamp-2",
          className
        )}
        {...props}
      >
        {
          title ||
          <>
            <Skeleton className="w-[95%] h-8 mb-1.5" />
            <Skeleton className="w-1/2 h-8" />
          </>
        }
        {year && (
          <span className="ml-2 font-normal text-white/80">
            ({year})
          </span>
        )}
      </Comp>
    );
  }
);

MovieTitle.displayName = "MovieTitle";

export { MovieTitle };
export type { MovieTitleProps };
