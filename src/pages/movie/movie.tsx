import { useMovieDetails } from '@/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Hero, RecommendedMovies } from './movie.primitives';
import TorrentTabs from '@/components/torrent/torrent-tabs';
import Seo from '@/components/seo';
import { Page } from '../page';
import { useBackgroundConfig } from '@/contexts/background-config-context';

const MoviePage = () => {
    const { id } = useParams();
    const { setBackgroundConfig } = useBackgroundConfig();
    const { data: movie, loading } = useMovieDetails({ movie_id: Number(id), with_cast: true });
    useEffect(() => {
        if (!movie) return;
        setBackgroundConfig({ image: movie.data.movie.background_image });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie]);

    const movieData = movie?.data.movie;
    const seoTitle = movieData
        ? `${movieData.title} (${movieData.year}) - YTS Movie Browser`
        : 'Movie - YTS Movie Browser';
    const seoDescription = movieData
        ? `${movieData.title} (${movieData.year}) - ${movieData.description_full?.slice(0, 155)}...`
        : 'View movie details and download high-quality torrents.';

    return (
        <>
            <Seo
                title={seoTitle}
                description={seoDescription}
                pathname={`/movie/${id}`}
                image={movieData?.large_cover_image}
                type="article"
            />
            <Page
                spacing="default"
                layout="wide"
                loading={loading}
                pageName="movie"
                className="space-y-6 pb-0"
            >
                <Hero movie={movie?.data.movie}></Hero>
                <TorrentTabs
                    torrents={movie?.data.movie.torrents}
                    movieName={movie?.data.movie.title}
                />
                <RecommendedMovies id={Number(id)} />
            </Page>
        </>
    );
};

export default MoviePage;
