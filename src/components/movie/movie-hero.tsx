import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { MoviePoster } from './movie-poster';
import { MovieTitle } from './movie-title';
import { MovieMeta } from './movie-meta';
import { GenreBadges } from './genre-badges';
import { MovieDescription } from './movie-description';
import { MovieSynopsis } from './movie-synopsis';
import { MovieHeroSkeleton } from '../skeleton/movie-hero-skeleton';
import { TrailerButton } from './trailer-button';
import { cn } from '@/lib/utils';
import type { Movie } from '@/hooks';
import DownloadDropdown from '../torrent/download-dropdown';

type MovieHeroVariant = 'default' | 'transparent';
interface MovieHeroProps extends React.ComponentPropsWithoutRef<'div'> {
    movie?: Movie;
    loading?: boolean;
    showTrailerButton?: boolean;
    showDownloadButton?: boolean;
    onGenreClick?: (genre: string) => void;
    variant?: MovieHeroVariant;
    asChild?: boolean;
    children?: React.ReactNode;
    header?: React.ReactNode;
}

const MovieHero = React.forwardRef<HTMLDivElement, MovieHeroProps>(
    (
        {
            movie,
            loading = false,
            showTrailerButton = true,
            showDownloadButton = true,
            onGenreClick,
            variant = 'default',
            asChild = false,
            className,
            children,
            header,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'div';

        if (loading || !movie) {
            return <MovieHeroSkeleton header={Boolean(header)} className={className} />;
        }

        const hasBackground = !!movie.background_image;

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                data-has-background={hasBackground}
                className={cn(
                    'relative overflow-hidden rounded-lg',
                    hasBackground && 'bg-cover bg-center bg-no-repeat',
                    'data-[variant=transparent]:bg-transparent',
                    className
                )}
                style={
                    hasBackground && variant !== 'transparent'
                        ? {
                              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${movie.background_image})`,
                          }
                        : undefined
                }
                {...props}
            >
                {header && (
                    <div className={cn('px-6', hasBackground && 'text-white')}>{header}</div>
                )}
                <div
                    className={cn(
                        'flex flex-col gap-6 p-6 md:flex-row',
                        hasBackground && 'text-white'
                    )}
                >
                    <MoviePoster
                        src={movie.large_cover_image}
                        alt={movie.title}
                        size="lg"
                        className="w-full md:w-64"
                    />
                    <div className="flex flex-1 flex-col gap-4">
                        <MovieTitle title={movie.title} year={movie.year} size="xl" />
                        <MovieSynopsis
                            synopsis={movie.synopsis}
                            lines={3}
                            className="hidden md:block"
                        />
                        <MovieMeta
                            movie={movie}
                            showItems={['year', 'runtime', 'rating', 'language', 'mpa_rating']}
                            className="space-x-2"
                        />
                        <GenreBadges genres={movie.genres} limit={5} onGenreClick={onGenreClick} />
                        {!(
                            movie.synopsis === movie.description_full ||
                            movie.synopsis === movie.summary
                        ) && (
                            <MovieDescription
                                description={movie.description_full || movie.summary}
                                lines={4}
                            />
                        )}
                        {children}
                        {(showTrailerButton || showDownloadButton || children) && (
                            <div className="flex *:max-md:flex-1 gap-2 md:gap-2 md:justify-end mt-auto">
                                {showTrailerButton && (
                                    <TrailerButton
                                        trailerCode={movie.yt_trailer_code}
                                        available={!!movie.yt_trailer_code}
                                        size="lg"
                                        variant="secondary"
                                    />
                                )}
                                {showDownloadButton && movie.torrents?.[0] && (
                                    <DownloadDropdown
                                        torrents={movie.torrents}
                                        movieTitle={movie.title}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Comp>
        );
    }
);

MovieHero.displayName = 'MovieHero';

export { MovieHero };
export type { MovieHeroProps };
