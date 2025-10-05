import useListMovies from './use-list-movies';
import type { Movie } from './use-list-movies';

interface UseFeaturedMovieOptions {
  skip?: boolean;
}

function useFeaturedMovie(options: UseFeaturedMovieOptions = {}) {
  const { data, error, loading, refetch } = useListMovies(
    {
      limit: 1,
      quality: '1080p',
      minimum_rating: 7,
      sort_by: 'date_added',
      order_by: 'desc',
    },
    options
  );

  const movie: Movie | null = data?.data?.movies?.[0] ?? null;

  return {
    data: movie,
    error,
    loading,
    refetch,
  };
}

export default useFeaturedMovie;
