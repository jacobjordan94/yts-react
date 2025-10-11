import * as React from "react";
import { MovieSynopsis } from "./movie-synopsis";
import { MovieDescription } from "./movie-description";
import type { Movie } from "@/hooks/use-list-movies";
import { Skeleton } from "../ui/skeleton";

type TextType = "summary" | "synopsis" | "description";

interface MovieTextProps extends React.ComponentPropsWithoutRef<"div"> {
  movie?: Movie;
  preference?: TextType[];
  link?: boolean;
  lines?: number;
  expandable?: boolean;
  asChild?: boolean;
}

const MovieText = React.forwardRef<HTMLDivElement, MovieTextProps>(
  ({ movie, preference = ["synopsis", "description", "summary"], link = false, lines, expandable, asChild, ...props }, ref) => {
    
    if(!movie) {
      return (
        <div {...props}>
          <Skeleton className="w-full h-4 mb-1.5" />
          <Skeleton className="w-full h-4 mb-1.5" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      )
    }
    
    // Map of text types to their values and component renderers
    const textMap: Record<TextType, { value: string | undefined; render: () => React.ReactNode }> = {
      summary: {
        value: movie.summary,
        render: () => movie.summary ? (
          <MovieDescription
            description={movie.summary}
            movieId={movie.id}
            link={link}
            lines={lines}
            expandable={expandable}
            asChild={asChild}
            {...props}
            ref={ref}
          />
        ) : null
      },
      synopsis: {
        value: movie.synopsis,
        render: () => movie.synopsis ? (
          <MovieSynopsis
            synopsis={movie.synopsis}
            movieId={movie.id}
            link={link}
            lines={lines}
            asChild={asChild}
            {...props}
            ref={ref}
          />
        ) : null
      },
      description: {
        value: movie.description_full,
        render: () => movie.description_full ? (
          <MovieDescription
            description={movie.description_full}
            movieId={movie.id}
            link={link}
            lines={lines}
            expandable={expandable}
            asChild={asChild}
            {...props}
            ref={ref}
          />
        ) : null
      }
    };

    // Find the first available text based on preference order
    for (const type of preference) {
      const text = textMap[type];
      if (text?.value) {
        return text.render();
      }
    }

    return null;
  }
);

MovieText.displayName = "MovieText";

export { MovieText };
export type { MovieTextProps, TextType };
