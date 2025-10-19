import { FeaturedMovieCarousel } from './home.primitives';
import useFeaturedMovies from '@/hooks/use-featured-movie';
import Seo from '@/components/seo';
import { Page } from '../page';
import { cn } from '@/lib/utils';

const HomePage = () => {
    const { data: featuredMovies, loading } = useFeaturedMovies();

    return (
        <>
            <Seo
                title="YTS Movie Browser - Browse & Discover Movies"
                description="Discover and browse featured movies. Find high-quality torrents with detailed information about thousands of films."
                pathname="/"
            />
            <Page
                loading={loading}
                pageName="home"
                layout="full"
                spacing="compact"
                className={cn('md:px-0 pb-0 md:space-y-12')}
            >
                <h2 className="text-3xl max-w-4xl ms-6 md:ps-6 md:m-auto font-[Quicksand] font-bold tracking-tight">
                    Featured
                </h2>
                <FeaturedMovieCarousel movies={featuredMovies} />
            </Page>
        </>
    );
};

export default HomePage;
