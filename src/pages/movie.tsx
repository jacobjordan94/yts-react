import { useMovieDetails } from "@/hooks";
import type { BackgroundImageLayoutContext } from "@/layouts/background-image";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import { Hero, RecommendedMovies } from './movie.primitives';
import TorrentTabs from "@/components/torrent/torrent-tabs";

const MoviePage = () => {
    const { id } = useParams();
    const { setBackgroundConfig } = useOutletContext<BackgroundImageLayoutContext>();
    const { data: movie } = useMovieDetails({ movie_id: Number(id) });
    useEffect(() => {
        if(!movie) return;
        setBackgroundConfig({ image: movie.data.movie.background_image });
    }, [ movie, setBackgroundConfig ]);

    return (
        <main className="movie-page sm:flex-row py-6 space-y-6 h-full">
            <Hero movie={movie?.data.movie}></Hero>
            <TorrentTabs torrents={ movie?.data.movie.torrents } movieName={movie?.data.movie.title} />
            <RecommendedMovies id={Number(id)} />
        </main>
    );
}

export default MoviePage;