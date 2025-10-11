import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { CommentAvatar } from "./comment-avatar";
import { CommentMeta } from "./comment-meta";
import { CommentText } from "./comment-text";
import { CommentCardSkeleton } from "../skeleton/comment-card-skeleton";
import { cn } from "@/lib/utils";
import type { Comment } from "@/hooks";

interface CommentCardProps extends React.ComponentPropsWithoutRef<"div"> {
  comment?: Comment;
  loading?: boolean;
  highlighted?: boolean;
  asChild?: boolean;
}

const CommentCard = React.forwardRef<HTMLDivElement, CommentCardProps>(
  ({ comment, loading = false, highlighted = false, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    if (loading || !comment) {
      return <CommentCardSkeleton className={className} />;
    }

    return (
      <Comp
        ref={ref}
        data-loading={loading}
        data-highlighted={highlighted}
        className={cn(
          "flex gap-4 rounded-lg p-4",
          "data-[highlighted=true]:bg-muted",
          className
        )}
        {...props}
      >
        <CommentAvatar
          src={comment.medium_user_avatar_image}
          username={comment.username}
        />
        <div className="flex-1 space-y-2">
          <CommentMeta
            username={comment.username}
            date={comment.date_added}
          />
          <CommentText text={comment.comment_text} />
        </div>
      </Comp>
    );
  }
);

CommentCard.displayName = "CommentCard";

export { CommentCard };
export type { CommentCardProps };
