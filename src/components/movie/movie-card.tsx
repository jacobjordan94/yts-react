import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { MovieCompactCard } from './movie-compact-card';
import { MovieDefaultCard } from './movie-default-card';
import { MovieDetailedCard } from './movie-detailed-card';
import { MovieCardSkeleton } from '../skeleton/movie-card-skeleton';
import type { Movie } from '@/hooks';

interface MovieCardProps extends ComponentPropsWithoutRef<'div'> {
    movie?: Movie;
    variant?: 'compact' | 'default' | 'detailed' | 'full';
    loading?: boolean;
    onGenreClick?: (genre: string) => void;
    asChild?: boolean;
}

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
    ({ movie, variant = 'default', loading = false, onGenreClick, className, ...props }, ref) => {
        if (loading || !movie) {
            return <MovieCardSkeleton variant={variant} className={className} />;
        }

        // Render the appropriate variant component
        switch (variant) {
            case 'compact':
                return (
                    <MovieCompactCard ref={ref} movie={movie} className={className} {...props} />
                );

            case 'detailed':
            case 'full':
                return (
                    <MovieDetailedCard
                        ref={ref}
                        movie={movie}
                        onGenreClick={onGenreClick}
                        className={className}
                        {...props}
                    />
                );

            case 'default':
            default:
                return (
                    <MovieDefaultCard ref={ref} movie={movie} className={className} {...props} />
                );
        }
    }
);

MovieCard.displayName = 'MovieCard';

export { MovieCard };
export type { MovieCardProps };
