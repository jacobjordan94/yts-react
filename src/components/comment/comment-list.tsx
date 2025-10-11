import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { CommentCard } from "./comment-card";
import { CommentCardSkeleton } from "../skeleton/comment-card-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Comment } from "@/hooks";

interface CommentListProps extends React.ComponentPropsWithoutRef<"div"> {
  comments?: Comment[];
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  maxHeight?: string;
  asChild?: boolean;
}

const CommentList = React.forwardRef<HTMLDivElement, CommentListProps>(
  ({
    comments = [],
    loading = false,
    empty = false,
    emptyMessage = "No comments yet",
    maxHeight = "600px",
    asChild = false,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "div";

    if (loading) {
      return (
        <Comp
          ref={ref}
          data-loading={loading}
          className={cn("space-y-4", className)}
          {...props}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentCardSkeleton key={i} />
          ))}
        </Comp>
      );
    }

    if (empty || comments.length === 0) {
      return (
        <Comp
          ref={ref}
          data-empty={true}
          className={cn(
            "flex min-h-[200px] items-center justify-center rounded-lg border border-dashed",
            className
          )}
          {...props}
        >
          <p className="text-muted-foreground">{emptyMessage}</p>
        </Comp>
      );
    }

    return (
      <ScrollArea style={{ maxHeight }} className={cn("pr-4", className)}>
        <Comp
          ref={ref}
          data-loading={loading}
          data-empty={empty}
          className="space-y-4"
          {...props}
        >
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Comp>
      </ScrollArea>
    );
  }
);

CommentList.displayName = "CommentList";

export { CommentList };
export type { CommentListProps };
