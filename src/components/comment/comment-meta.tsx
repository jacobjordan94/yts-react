import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface CommentMetaProps extends React.ComponentPropsWithoutRef<"div"> {
  username: string;
  date: string;
  layout?: "horizontal" | "vertical";
  asChild?: boolean;
}

const CommentMeta = React.forwardRef<HTMLDivElement, CommentMetaProps>(
  ({ username, date, layout = "horizontal", asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <Comp
        ref={ref}
        data-layout={layout}
        className={cn(
          "flex items-center gap-2",
          "data-[layout=vertical]:flex-col data-[layout=vertical]:items-start data-[layout=vertical]:gap-0",
          className
        )}
        {...props}
      >
        <span className="font-medium">{username}</span>
        <span className="text-xs text-muted-foreground">
          {layout === "horizontal" && "•"} {formattedDate}
        </span>
      </Comp>
    );
  }
);

CommentMeta.displayName = "CommentMeta";

export { CommentMeta };
export type { CommentMetaProps };
