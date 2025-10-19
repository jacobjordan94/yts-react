import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import type { Movie } from '@/hooks';
import { cn } from '@/lib/utils';
import { FeaturedMovie } from './featured-movie';
import { FeaturedMovies } from './featured-movies';
import { useEffect, useState, useRef } from 'react';
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const autoplayRef = useRef(
        Autoplay({
            delay: 5000,
            jump: true,
            stopOnInteraction: false,
            stopOnFocusIn: false,
            stopOnMouseEnter: false,
        })
    );

    // Set background image to first movie on component mount
    useEffect(() => {
        if (!movies || movies.length === 0) return;
        const firstMovie = movies[0];
        const image = firstMovie?.background_image || firstMovie?.background_image_original;
        setBackgroundConfig({ image: image || './kenobi.webp' });
    }, [movies, setBackgroundConfig]);

    useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            const index = api.selectedScrollSnap();
            const image =
                movies?.at(index)?.background_image || movies?.at(index)?.background_image_original;
            setCurrentIndex(index);
            setBackgroundConfig({ image: image || './kenobi.webp' });
        };
        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api, movies, setBackgroundConfig]);

    function onMovieClick(index: number) {
        api?.scrollTo(index);
    }

    const handleTrailerOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        const autoplay = autoplayRef.current;

        if (open) {
            autoplay.stop();
        } else {
            autoplay.play();
        }
    };

    // Manual mouse/focus handlers to replace plugin's built-in ones
    const handleCarouselMouseEnter = () => {
        if (isDialogOpen) return;
        autoplayRef.current.stop();
    };

    const handleCarouselMouseLeave = () => {
        if (isDialogOpen) return;
        autoplayRef.current.play();
    };

    const handleCarouselFocus = () => {
        if (isDialogOpen) return;
        autoplayRef.current.stop();
    };

    const handleCarouselBlur = () => {
        if (isDialogOpen) return;
        autoplayRef.current.play();
    };

    if (!movies) return null;

    return (
        <>
            <div className="featured-movie-carousel">
                <Carousel
                    {...props}
                    plugins={[autoplayRef.current]}
                    setApi={setApi}
                    className={cn('', className)}
                    onMouseEnter={handleCarouselMouseEnter}
                    onMouseLeave={handleCarouselMouseLeave}
                    onFocus={handleCarouselFocus}
                    onBlur={handleCarouselBlur}
                >
                    <CarouselContent>
                        {movies.map((movie, i) => (
                            <CarouselItem key={`${movie.id}-${i}`}>
                                <FeaturedMovie
                                    className="max-w-4xl m-auto"
                                    movie={movie}
                                    onTrailerOpenChange={handleTrailerOpenChange}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <FeaturedMovies
                movies={movies}
                onMovieClick={(_movie, i) => onMovieClick(i)}
                currentIndex={currentIndex}
                className={cn(
                    'sticky bottom-0 md:block md:max-w-5xl md:m-auto py-2 px-4 md:px-0',
                    'max-md:bg-background/60 max-md:rounded-none '
                )}
            />
        </>
    );
};
