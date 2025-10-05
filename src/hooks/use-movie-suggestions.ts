import useApi from './use-api';
import type { Movie } from './use-list-movies';

interface MovieSuggestionsResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    movies: Movie[];
  };
}

interface MovieSuggestionsParams {
  movie_id: number;
}

interface UseMovieSuggestionsOptions {
  skip?: boolean;
}

function useMovieSuggestions(
  params: MovieSuggestionsParams,
  options: UseMovieSuggestionsOptions = {}
) {
  return useApi<MovieSuggestionsResponse>('movie_suggestions.json', params, options);
}

export default useMovieSuggestions;
export type { MovieSuggestionsParams, MovieSuggestionsResponse };
