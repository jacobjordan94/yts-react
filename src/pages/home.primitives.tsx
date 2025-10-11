import Section from "@/components/ui/section";
import { MovieCard, MovieHero } from "@/components/movie";
import type { Movie } from "@/hooks";
import { Link } from "react-router";

interface FeaturedMovieProps {
    movie: Movie | undefined;
    error: Error | null;
    loading: boolean;
}

const FeaturedMovie = ({ movie, error, loading }: FeaturedMovieProps) => {
    return (
        <Section.Base
            data-loading={loading}
            data-error={error}
            className="group/Section overflow-hidden p-0 bg-transparent shadow-none"
        >
            <Section.Content asChild className="p-0">
                <MovieHero
                    movie={movie ?? undefined}
                    loading={loading}
                    className="transition-all duration-300 hover:shadow-xl"
                    variant="transparent"
                    header={
                        <Section.Header>
                            <Section.Title>Featured</Section.Title>
                        </Section.Header>
                    }
                >
                </MovieHero>
            </Section.Content>
        </Section.Base>
    );
}

const FeaturedMovies = ({ movies, preview = 5, ...props }: { movies?: Movie[], preview?: number }) => 
    <Section.Base { ...props } className="p-0 bg-transparent shadow-none">
        <Section.Content className="p-0 grid grid-cols-2 md:grid-cols-5 gap-4">
        {
            Array.from({ length: preview }).fill(undefined).map((_, i) =>
                <Link aria-disabled={!movies} key={i} to={'/movie/' + movies?.at(i)?.id} className="transition-[scale] hover:scale-105">
                    <MovieCard className="py-0" variant="compact" movie={movies?.at(i)} />
                </Link>
        )}
        </Section.Content>
    </Section.Base>


export default { FeaturedMovie, FeaturedMovies };