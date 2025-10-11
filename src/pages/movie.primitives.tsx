import { MovieGrid } from "@/components/layout";
import { GenreBadges, MovieDescription, MovieMeta, MoviePoster, MovieTitle } from "@/components/movie";
import { MovieSynopsis } from "@/components/movie/movie-synopsis";
import { RatingDisplay } from "@/components/movie/rating-display";
import { TrailerButton } from "@/components/movie/trailer-button";
import Section from "@/components/ui/section";
import { useMovieSuggestions, type Movie } from "@/hooks";
import DownloadDropdown from "@/components/torrent/download-dropdown";
import { Separator } from "@/components/ui/separator";

const Hero = ({ movie }: { movie: Movie | undefined }) =>
    <div className="flex gap-6 ">
        <MoviePoster className="flex-1/3 pt-2" size="full" src={movie?.large_cover_image} />
        <div className="movie-info flex-2/3 flex flex-col space-y-4">
            <div className="title-information space-y-2">
                <MovieTitle title={movie?.title_english || ''} year={movie?.year} className="text-4xl" />
                <div className="flex items-center gap-4">
                    <RatingDisplay rating={movie?.rating || 0} variant="both" showLabel />
                    <Separator orientation="vertical" className="min-h-4" />
                    { movie && <MovieMeta movie={movie} className="text-white/80" showItems={['runtime', 'year']} /> }
                </div>
            </div>
            <MovieSynopsis synopsis={movie?.synopsis } />
            <div className="flex items-center gap-3">
                <DownloadDropdown movieTitle={movie?.title_english} torrents={movie?.torrents} />
                <TrailerButton trailerCode={movie?.yt_trailer_code} variant="outline" />
            </div>
            <div className="flex gap-2">
                { movie && <MovieMeta movie={movie} className="text-white/70" showItems={['language', 'mpa_rating']} /> }
                <GenreBadges genres={movie?.genres || []} />
            </div>
            <MovieDescription className="text-white/80" description={ movie?.description_full || movie?.summary || '' } />
        </div>
    </div>

const RecommendedMovies = ({ id }: { id: number }) => {
    const { data: recommended, error: recommendedError, loading: recommendedLoading } = useMovieSuggestions(id);
    return (
        <Section.Base className="bg-transparent text-white shadow-none">
            <Section.Header className="p-0">
                <Section.Title>Recommended</Section.Title>
            </Section.Header>
            <Section.Content className="p-0">
                <MovieGrid movies={recommended?.data.movies} loading={recommendedLoading} columns={4} />
            </Section.Content>
        </Section.Base>
    );
};

export default { Hero, RecommendedMovies };