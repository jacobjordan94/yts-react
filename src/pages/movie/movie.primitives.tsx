import { MovieGrid } from '@/components/layout';
import {
    GenreBadges,
    MovieDescription,
    MovieMeta,
    MoviePoster,
    MovieTitle,
    MovieSynopsis,
    RatingDisplay,
} from '@/components/movie';
import Section from '@/components/ui/section';
import { useMovieSuggestions, type Movie } from '@/hooks';
import { DownloadDropdown } from '@/components/torrent';
import { Separator } from '@/components/ui/separator';
import { YoutubeDialog } from '@/components/dialogs';
import { CastList } from '@/components/cast';

export const Hero = ({ movie }: { movie: Movie | undefined }) => (
    <div className="flex gap-6 flex-col md:flex-row">
        <MoviePoster
            className="flex-1/3 drop-shadow-black/50 drop-shadow-md"
            size="full"
            src={movie?.large_cover_image}
        />
        <div className="movie-info flex-2/3 flex flex-col space-y-4">
            <div className="title-information space-y-2">
                <MovieTitle
                    title={movie?.title_english || ''}
                    year={movie?.year}
                    className="font-[Quicksand] font-bold text-4xl text-shadow-md text-shadow-black/50"
                />
                <div className="flex items-center gap-4">
                    <RatingDisplay rating={movie?.rating || 0} variant="both" showLabel />
                    <Separator orientation="vertical" className="min-h-4" />
                    {movie && (
                        <MovieMeta
                            movie={movie}
                            className="text-white/80"
                            showItems={['runtime', 'year']}
                        />
                    )}
                </div>
            </div>
            <MovieSynopsis
                className="text-shadow-md text-shadow-black/50"
                synopsis={movie?.synopsis}
            />
            <div className="flex items-center gap-3">
                <DownloadDropdown movieTitle={movie?.title_english} torrents={movie?.torrents} />
                {movie?.yt_trailer_code && (
                    <YoutubeDialog id={movie?.yt_trailer_code} showLabel={true} />
                )}
            </div>
            <div className="flex gap-2">
                {movie && (
                    <MovieMeta
                        movie={movie}
                        className="text-white/70"
                        showItems={['language', 'mpa_rating']}
                    />
                )}
                <GenreBadges genres={movie?.genres || []} />
            </div>
            <MovieDescription
                className="text-white/80 text-shadow-md text-shadow-black/50"
                description={movie?.description_full || movie?.summary || ''}
            />
            {movie?.cast && (
                <CastList
                    className="mt-auto md:me-auto md:min-w-xs"
                    direction="vertical"
                    cast={movie?.cast}
                />
            )}
        </div>
    </div>
);

export const RecommendedMovies = ({ id }: { id: number }) => {
    const { data: recommended, loading: recommendedLoading } = useMovieSuggestions(id);
    return (
        <Section.Base className="bg-transparent text-white shadow-none">
            <Section.Header className="p-0">
                <Section.Title className="font-[Quicksand] font-bold">Recommended</Section.Title>
            </Section.Header>
            <Section.Content className="p-0">
                <MovieGrid
                    movies={recommended?.data.movies}
                    loading={recommendedLoading}
                    columns={4}
                />
            </Section.Content>
        </Section.Base>
    );
};

export default { Hero, RecommendedMovies };
