import * as React from 'react';
import { MovieCardBase, type MovieCardBaseProps } from './movie-card-base';
import { MoviePoster } from './movie-poster';
import { MovieTitle } from './movie-title';
import { MovieMeta } from './movie-meta';
import { CardContent, CardTitle, CardDescription } from '../ui/card';
import { cn } from '@/lib/utils';
import type { Movie } from '@/hooks';

interface MovieDefaultCardProps extends Omit<MovieCardBaseProps, 'children'> {
    movie: Movie;
}

const MovieDefaultCard = React.forwardRef<HTMLDivElement, MovieDefaultCardProps>(
    ({ movie, className, ...props }, ref) => {
        return (
            <MovieCardBase ref={ref} className={cn('gap-2 pt-0', className)} {...props}>
                <MoviePoster
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    className="rounded-b-none h-full"
                    size="full"
                />
                <CardContent className="px-2">
                    <div className="flex flex-col gap-1">
                        <CardTitle>
                            <MovieTitle title={movie.title} year={movie.year} size="md" truncate />
                        </CardTitle>
                        <CardDescription>
                            <MovieMeta movie={movie} compact showItems={['rating']} />
                        </CardDescription>
                    </div>
                </CardContent>
            </MovieCardBase>
        );
    }
);

MovieDefaultCard.displayName = 'MovieDefaultCard';

export { MovieDefaultCard };
export type { MovieDefaultCardProps };
