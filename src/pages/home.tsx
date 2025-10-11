import Primitives from './home.primitives';
import useFeaturedMovies from '@/hooks/use-featured-movie';
import { useOutletContext } from 'react-router';
import type { BackgroundImageLayoutContext } from '@/layouts/background-image';
import { useEffect } from 'react';
import { MovieCard, MovieCardSkeleton, MovieGrid } from '@/components';

const HomePage = () => {
    const { setBackgroundConfig } = useOutletContext<BackgroundImageLayoutContext>();
    const { data: featuredMovies, loading: featuredLoading, error: featuredError } = useFeaturedMovies();

    useEffect(() => {
        if(!featuredMovies || featuredMovies.length === 0) return;
        setBackgroundConfig({ image: featuredMovies?.at(0)?.background_image_original });
    }, [setBackgroundConfig, featuredMovies]);

    return (
        <main className="home-page space-y-4 pb-12">
            <Primitives.FeaturedMovie movie={ featuredMovies?.at(0) } loading={featuredLoading} error={featuredError} />
            <MovieGrid variant="compact" columns={5} movies={featuredMovies?.slice(1)} loading={featuredLoading} />
        </main>
    );
};

export default HomePage;