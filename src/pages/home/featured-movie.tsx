import Section from "@/components/ui/section";
import { MovieHero } from "@/components/movie";
import type { Movie } from "@/hooks";

interface FeaturedMovieProps {
    movie: Movie | undefined;
    error: Error | null;
    loading: boolean;
}

export const FeaturedMovie = ({ movie, error, loading }: FeaturedMovieProps) => {
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
