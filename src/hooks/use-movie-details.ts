import useApi from './use-api';
import type { Movie } from './use-list-movies';

interface MovieDetailsResponse {
    status: string;
    status_message: string;
    data: {
        movie: Movie;
    };
}

interface MovieDetailsParams {
    movie_id: number;
    with_images?: boolean;
    with_cast?: boolean;
}

interface UseMovieDetailsOptions {
    skip?: boolean;
}

function useMovieDetails(params: MovieDetailsParams, options: UseMovieDetailsOptions = {}) {
    return useApi<MovieDetailsResponse>('movie_details.json', params, options);
}

export default useMovieDetails;
export type { MovieDetailsParams, MovieDetailsResponse };
