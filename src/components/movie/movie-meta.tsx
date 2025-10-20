import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { YearBadge } from './year-badge';
import { RuntimeDisplay } from './runtime-display';
import { RatingDisplay } from './rating-display';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { Movie } from '@/hooks';

interface MovieMetaProps extends ComponentPropsWithoutRef<'div'> {
    movie?: Pick<Movie, 'year' | 'runtime' | 'rating' | 'language' | 'mpa_rating'>;
    layout?: 'horizontal' | 'vertical';
    compact?: boolean;
    showItems?: ('year' | 'runtime' | 'rating' | 'language' | 'mpa_rating')[];
    loading?: boolean;
    asChild?: boolean;
}

const MovieMeta = forwardRef<HTMLDivElement, MovieMetaProps>(
    (
        {
            movie,
            layout = 'horizontal',
            compact = false,
            showItems = ['year', 'runtime', 'rating'],
            loading = false,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';

        if (loading || !movie) {
            return (
                <Comp
                    ref={ref}
                    data-loading={loading}
                    {...props}
                    className={cn(
                        'movie-meta-loading flex gap-2',
                        layout === 'vertical' && 'flex-col',
                        className
                    )}
                >
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                data-layout={layout}
                data-compact={compact}
                data-loading={loading}
                className={cn(
                    'flex flex-wrap items-center gap-0 movie-meta',
                    'data-[layout=vertical]:flex-col data-[layout=vertical]:items-start',
                    'data-[compact=true]:gap-0 data-[compact=true]:text-sm',
                    className
                )}
                {...props}
            >
                {showItems.includes('year') && (
                    <YearBadge className="text-white/80" year={movie.year} />
                )}
                {showItems.includes('runtime') && movie.runtime > 0 && (
                    <RuntimeDisplay className="text-white/80" runtime={movie.runtime} />
                )}
                {showItems.includes('rating') && (
                    <RatingDisplay rating={movie.rating} variant="both" />
                )}
                {showItems.includes('language') && movie.language && (
                    <span className="text-sm text-white/80">{movie.language}</span>
                )}
                {showItems.includes('mpa_rating') && movie.mpa_rating && (
                    <span className="text-sm font-medium">{movie.mpa_rating}</span>
                )}
            </Comp>
        );
    }
);

MovieMeta.displayName = 'MovieMeta';

export { MovieMeta };
export type { MovieMetaProps };
