import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { GenreBadge } from "./genre-badge";
import { cn } from "@/lib/utils";

interface GenreBadgesProps extends React.ComponentPropsWithoutRef<"div"> {
  genres?: string[];
  limit?: number;
  onGenreClick?: (genre: string) => void;
  asChild?: boolean;
  loading?: boolean;
}

const GenreBadges = React.forwardRef<HTMLDivElement, GenreBadgesProps>(
  ({ loading, genres, limit, onGenreClick, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const ready = !loading && !!genres;

    if(!ready) {
      return (
      <div className="flex gap-2 *:max-w-fit">
          <GenreBadge genre="longest" showIcon={false} className="animate-pulse h-5 text-transparent" />
          <GenreBadge genre="shrt" showIcon={false} className="animate-pulse h-5 text-transparent" />
          <GenreBadge genre="longer" showIcon={false} className="animate-pulse h-5 text-transparent" />
      </div>
      );
    }
    
    const displayedGenres = limit ? genres.slice(0, limit) : genres;
    const hasMore = limit && genres.length > limit;

    return (
      <Comp
        ref={ref}
        data-limit={limit}
        className={cn("flex gap-2 *:max-w-fit", className)}
        {...props}
      >
        {displayedGenres.map((genre) => (
          <GenreBadge
            key={genre}
            genre={genre}
            clickable={!!onGenreClick}
            onClick={() => onGenreClick?.(genre)}
          />
        ))}
        {hasMore && (
          <GenreBadge
            genre={`+${genres.length - limit}`}
            clickable={false}
          />
        )}
      </Comp>
    );
  }
);

GenreBadges.displayName = "GenreBadges";

export { GenreBadges };
export type { GenreBadgesProps };
