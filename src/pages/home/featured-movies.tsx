import Section from '@/components/ui/section';
import { MovieCard } from '@/components/movie';
import type { Movie } from '@/hooks';
import { cn } from '@/lib/utils';
import type { MouseEvent as ReactMouseEvent } from 'react';

type FeaturedMoviesProps = {
    movies?: Movie[];
    onMovieClick: (movie: Movie, i: number, e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
    currentIndex: number;
    className: string;
};
export const FeaturedMovies = ({
    movies = [],
    onMovieClick,
    currentIndex,
    className,
    ...props
}: FeaturedMoviesProps) => (
    <Section.Base {...props} className={cn('p-0 bg-transparent shadow-none', className)}>
        <Section.Content className="p-0 md:px-4 grid grid-cols-6 gap-4 md:gap-5">
            {movies.map((movie, i) => (
                <MovieCard
                    key={`${movie.id}-${i}`}
                    data-active={i === currentIndex}
                    onClick={(e) => onMovieClick(movie, i, e)}
                    className={cn(
                        'hover:scale-105 hover:data-[active=true]:scale-115 data-[active=true]:scale-115 data-[active=true]:-translate-y-4 md:data-[active=true]:-translate-y-8',
                        'grayscale-75 data-[active=true]:grayscale-0 md'
                    )}
                    variant="compact"
                    movie={movie}
                />
            ))}
        </Section.Content>
    </Section.Base>
);
