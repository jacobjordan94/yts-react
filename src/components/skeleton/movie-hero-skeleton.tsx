import * as React from "react";
import { MoviePosterSkeleton } from "./movie-poster-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MovieHeroSkeletonProps extends React.ComponentPropsWithoutRef<"div"> { header: boolean }

const MovieHeroSkeleton = React.forwardRef<HTMLDivElement, MovieHeroSkeletonProps>(
  ({ className, header, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        { header && <Skeleton className="h-[32px] w-sm mt-6"></Skeleton> }
        <div className="flex flex-col gap-6 md:flex-row">
          <MoviePosterSkeleton size="lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MovieHeroSkeleton.displayName = "MovieHeroSkeleton";

export { MovieHeroSkeleton };
export type { MovieHeroSkeletonProps };
