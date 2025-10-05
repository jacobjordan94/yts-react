import useApi from './use-api';

interface ParentalGuide {
  type: string;
  parental_guide_text: string;
}

interface MovieParentalGuidesResponse {
  status: string;
  status_message: string;
  data: {
    parental_guide_count: number;
    parental_guides: ParentalGuide[];
  };
}

interface MovieParentalGuidesParams {
  movie_id: number;
}

interface UseMovieParentalGuidesOptions {
  skip?: boolean;
}

function useMovieParentalGuides(
  params: MovieParentalGuidesParams,
  options: UseMovieParentalGuidesOptions = {}
) {
  return useApi<MovieParentalGuidesResponse>('movie_parental_guides.json', params, options);
}

export default useMovieParentalGuides;
export type { ParentalGuide, MovieParentalGuidesParams, MovieParentalGuidesResponse };
