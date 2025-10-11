import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TorrentItemSkeletonProps extends React.ComponentPropsWithoutRef<"div"> {}

const TorrentItemSkeleton = React.forwardRef<HTMLDivElement, TorrentItemSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between rounded-lg border p-4", className)}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-16" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    );
  }
);

TorrentItemSkeleton.displayName = "TorrentItemSkeleton";

export { TorrentItemSkeleton };
export type { TorrentItemSkeletonProps };
