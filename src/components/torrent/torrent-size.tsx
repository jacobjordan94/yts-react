import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface TorrentSizeProps extends React.ComponentPropsWithoutRef<"span"> {
  sizeBytes?: number;
  size?: string;
  asChild?: boolean;
}

const TorrentSize = React.forwardRef<HTMLSpanElement, TorrentSizeProps>(
  ({ sizeBytes, size, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    const displaySize = size || (sizeBytes ? `${(sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GB` : "Unknown");

    return (
      <Comp
        ref={ref}
        className={cn("text-sm font-medium text-muted-foreground", className)}
        {...props}
      >
        {displaySize}
      </Comp>
    );
  }
);

TorrentSize.displayName = "TorrentSize";

export { TorrentSize };
export type { TorrentSizeProps };
