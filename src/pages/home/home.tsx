import { FeaturedMovieCarousel } from './home.primitives';
import useFeaturedMovies from '@/hooks/use-featured-movie';
import { useEffect } from 'react';
import Seo from '@/components/seo';
import { Page } from '../page';
import { useBackgroundConfig } from '@/contexts/background-config-context';

const HomePage = () => {
    const { setBackgroundConfig } = useBackgroundConfig();
    const { data: featuredMovies, loading: featuredLoading, error: featuredError } = useFeaturedMovies();

    useEffect(() => {
        if(!featuredMovies || featuredMovies.length === 0) return;
        setBackgroundConfig({ image: featuredMovies?.at(0)?.background_image });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuredMovies]);

    return (
        <>
            <Seo
                title="YTS Movie Browser - Browse & Discover Movies"
                description="Discover and browse featured movies. Find high-quality torrents with detailed information about thousands of films."
                pathname="/"
            />
            <Page pageName="home" layout="full" spacing="compact" className='md:px-0 pb-0 md:space-y-12'>
                <h2 className='text-3xl max-w-4xl ms-6 md:ps-6 md:m-auto font-semibold'>Featured</h2>
                <FeaturedMovieCarousel movies={featuredMovies} />
            </Page>
        </>
    );
};

export default HomePage;