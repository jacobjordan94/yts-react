import { useMovieDetails } from "@/hooks";
import type { BackgroundImageLayoutContext } from "@/layouts/background-image";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import { Hero, RecommendedMovies } from './movie.primitives';
import TorrentTabs from "@/components/torrent/torrent-tabs";
import Seo from "@/components/seo";

const MoviePage = () => {
    const { id } = useParams();
    const { setBackgroundConfig } = useOutletContext<BackgroundImageLayoutContext>();
    const { data: movie } = useMovieDetails({ movie_id: Number(id) });
    useEffect(() => {
        if(!movie) return;
        setBackgroundConfig({ image: movie.data.movie.background_image });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ movie ]);

    const movieData = movie?.data.movie;
    const seoTitle = movieData ? `${movieData.title} (${movieData.year}) - YTS Movie Browser` : 'Movie - YTS Movie Browser';
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
            <main className="movie-page sm:flex-row py-6 space-y-6 h-full">
                <Hero movie={movie?.data.movie}></Hero>
                <TorrentTabs torrents={ movie?.data.movie.torrents } movieName={movie?.data.movie.title} />
                <RecommendedMovies id={Number(id)} />
            </main>
        </>
    );
}

export default MoviePage;