import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { MovieCard } from "../movie/movie-card";
import { MovieCardSkeleton } from "../skeleton/movie-card-skeleton";
import { cn } from "@/lib/utils";
import type { Movie } from "@/hooks";
import { Link } from "react-router";

interface MovieGridProps extends React.ComponentPropsWithoutRef<"div"> {
  movies?: Movie[];
  loading?: boolean;
  empty?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6 | 8;
  rows?: number;
  variant?: "compact" | "default" | "detailed";
  renderCard?: (movie: Movie) => React.ReactNode;
  onMovieClick?: (movie: Movie) => void;
  onGenreClick?: (genre: string) => void;
  emptyMessage?: string;
  asChild?: boolean;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  8: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8",
};

const MovieGrid = React.forwardRef<HTMLDivElement, MovieGridProps>(
  ({
    movies = [],
    loading = false,
    empty = false,
    columns = 4,
    rows = 1,
    variant = "default",
    renderCard,
    onMovieClick,
    onGenreClick,
    emptyMessage = "No movies found",
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
          data-columns={columns}
          className={cn("grid gap-4", columnClasses[columns], className)}
          {...props}
        >
          {Array.from({ length: columns * rows }).map((_, i) => (
            <MovieCardSkeleton key={i} variant={variant} />
          ))}
        </Comp>
      );
    }

    if (empty || movies.length === 0) {
      return (
        <Comp
          ref={ref}
          data-empty={true}
          className={cn(
            "flex min-h-[400px] items-center justify-center rounded-lg border border-dashed",
            className
          )}
          {...props}
        >
          <div className="text-center">
            <p className="text-lg text-muted-foreground">{emptyMessage}</p>
          </div>
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        data-loading={loading}
        data-empty={empty}
        data-columns={columns}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {movies.map((movie, i) =>
          renderCard ? (
            <React.Fragment key={`${movie.id}-${i}`}>{renderCard(movie)}</React.Fragment>
          ) : (
            <Link key={`${movie.id}-${i}`} to={`/movie/${movie.id}`}>
              <MovieCard
                className="shadow-sm"
                movie={movie}
                variant={variant}
                onClick={() => onMovieClick?.(movie)}
                onGenreClick={onGenreClick}
              />
            </Link>
          )
        )}
      </Comp>
    );
  }
);

MovieGrid.displayName = "MovieGrid";

export { MovieGrid };
export type { MovieGridProps };
