import { FeaturedMovie } from './home.primitives';
import useFeaturedMovies from '@/hooks/use-featured-movie';
import { useEffect } from 'react';
import { MovieGrid } from '@/components';
import Seo from '@/components/seo';
import { Page } from '../page';
import { useBackgroundConfig } from '@/contexts/background-config-context';

const HomePage = () => {
    const { setBackgroundConfig } = useBackgroundConfig();
    const { data: featuredMovies, loading: featuredLoading, error: featuredError } = useFeaturedMovies();

    useEffect(() => {
        if(!featuredMovies || featuredMovies.length === 0) return;
        setBackgroundConfig({ image: featuredMovies?.at(0)?.background_image_original });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuredMovies]);

    return (
        <>
            <Seo
                title="YTS Movie Browser - Browse & Discover Movies"
                description="Discover and browse featured movies. Find high-quality torrents with detailed information about thousands of films."
                pathname="/"
            />
            <Page pageName="home" spacing="relaxed" className="space-y-4">
                <FeaturedMovie movie={ featuredMovies?.at(0) } loading={featuredLoading} error={featuredError} />
                <MovieGrid variant="compact" columns={5} movies={featuredMovies?.slice(1)} loading={featuredLoading} />
            </Page>
        </>
    );
};

export default HomePage;