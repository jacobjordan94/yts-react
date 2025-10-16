import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Spinner } from '@/components/ui/spinner';
import type { Movie } from '@/hooks';
import { cn } from '@/lib/utils';
import { FeaturedMovie } from './featured-movie';
import { FeaturedMovies } from './featured-movies';
import { useEffect, useState } from 'react';
import { useBackgroundConfig } from '@/contexts/background-config-context';
import Autoplay from 'embla-carousel-autoplay';

type FeaturedMovieCarouselProps = {
    movies?: Movie[] | null;
    className?: string;
};
export const FeaturedMovieCarousel = ({
    movies = [],
    className,
    ...props
}: FeaturedMovieCarouselProps) => {
    const { setBackgroundConfig } = useBackgroundConfig();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;
        api.scrollTo(currentIndex);
    }, [api, currentIndex]);

    useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setCurrentIndex(api.selectedScrollSnap());
        };
        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    function onMovieClick(movie: Movie, index: number) {
        setBackgroundConfig({ image: movie.background_image });
        api?.scrollTo(index);
    }

    if (!movies) return <Spinner />;

    return (
        <>
            <Carousel
                {...props}
                plugins={[
                    Autoplay({
                        delay: 4000,
                        jump: true,
                        stopOnInteraction: false,
                        stopOnFocusIn: false,
                    }),
                ]}
                setApi={setApi}
                className={cn('', className)}
            >
                <CarouselContent>
                    {movies.map((movie, i) => (
                        <CarouselItem key={`${movie.id}-${i}`}>
                            <FeaturedMovie className="max-w-4xl m-auto" movie={movie} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <FeaturedMovies
                movies={movies}
                onMovieClick={(movie, i) => onMovieClick(movie, i)}
                currentIndex={currentIndex}
                className={cn(
                    'sticky bottom-0 md:block md:max-w-5xl md:m-auto py-2 px-4 md:px-0',
                    'max-md:bg-background/60 max-md:rounded-none '
                )}
            />
        </>
    );
};
