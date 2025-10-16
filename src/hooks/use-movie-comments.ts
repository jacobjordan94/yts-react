import useApi from './use-api';

interface Comment {
    id: number;
    user_id: number;
    username: string;
    comment_text: string;
    date_added: string;
    date_added_unix: number;
    small_user_avatar_image: string;
    medium_user_avatar_image: string;
}

interface MovieCommentsResponse {
    status: string;
    status_message: string;
    data: {
        comment_count: number;
        comments: Comment[];
    };
}

interface MovieCommentsParams {
    movie_id: number;
}

interface UseMovieCommentsOptions {
    skip?: boolean;
}

function useMovieComments(movieId: number | undefined, options: UseMovieCommentsOptions = {}) {
    return useApi<MovieCommentsResponse>('movie_comments.json', { movie_id: movieId }, options);
}

export default useMovieComments;
export type { Comment, MovieCommentsParams, MovieCommentsResponse };
