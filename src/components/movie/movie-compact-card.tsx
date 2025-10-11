import * as React from "react";
import { MovieCardBase, type MovieCardBaseProps } from "./movie-card-base";
import { MoviePoster } from "./movie-poster";
import { cn } from "@/lib/utils";
import type { Movie } from "@/hooks";

interface MovieCompactCardProps extends Omit<MovieCardBaseProps, "children"> {
  movie: Movie;
}

const MovieCompactCard = React.forwardRef<HTMLDivElement, MovieCompactCardProps>(
  ({ movie, className, ...props }, ref) => {
    return (
      <MovieCardBase
        ref={ref}
        className={cn("p-0 rounded-md overflow-hidden", className)}
        {...props}
      >
        <MoviePoster
          src={movie.medium_cover_image}
          alt={movie.title}
          className="w-full"
        />
      </MovieCardBase>
    );
  }
);

MovieCompactCard.displayName = "MovieCompactCard";

export { MovieCompactCard };
export type { MovieCompactCardProps };
