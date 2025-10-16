import useListMovies from './use-list-movies';
import type { Movie } from './use-list-movies';

interface UseFeaturedMoviesOptions {
    skip?: boolean;
}

function useFeaturedMovies(options: UseFeaturedMoviesOptions = {}) {
    const { data, error, loading, refetch } = useListMovies(
        {
            limit: 6,
            quality: '1080p',
            minimum_rating: 7,
            sort_by: 'date_added',
            order_by: 'desc',
            with_rt_ratings: true,
        },
        options
    );

    const movies: Movie[] | null = data?.data?.movies ?? null;

    return {
        data: movies,
        error,
        loading,
        refetch,
    };
}

export default useFeaturedMovies;
