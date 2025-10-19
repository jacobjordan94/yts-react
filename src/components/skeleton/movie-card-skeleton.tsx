import * as React from 'react';
import { MoviePosterSkeleton } from './movie-poster-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { MovieCardBase } from '../movie/movie-card-base';
import { CardContent, CardDescription, CardTitle } from '../ui/card';
import { MovieMeta } from '../movie';
import { MovieDetailedCard } from '../movie/movie-detailed-card';

interface MovieCardSkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
    variant?: 'compact' | 'default' | 'detailed' | 'full';
}

const MovieCardSkeleton = React.forwardRef<HTMLDivElement, MovieCardSkeletonProps>(
    ({ variant = 'default', className, ...props }, ref) => {
        if (variant === 'compact')
            return (
                <MovieCardBase
                    ref={ref}
                    {...props}
                    className={cn('p-0 bg-transparent shadow-none', className)}
                >
                    <MoviePosterSkeleton size="full" />
                </MovieCardBase>
            );
        if (variant === 'default')
            return (
                <MovieCardBase
                    ref={ref}
                    {...props}
                    className={cn('bg-transparent gap-2 pt-0 shadow-none', className)}
                >
                    <MoviePosterSkeleton size="full" className="rounded-b-none" />
                    <CardContent className="px-2 mt-1">
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text mt-1">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-1/2 mt-1" />
                            </CardTitle>
                            <CardDescription className="mt-2">
                                <MovieMeta compact loading />
                            </CardDescription>
                        </div>
                    </CardContent>
                </MovieCardBase>
            );
        return <MovieDetailedCard ref={ref} skeleton />;
    }
);

MovieCardSkeleton.displayName = 'MovieCardSkeleton';

export { MovieCardSkeleton };
export type { MovieCardSkeletonProps };
