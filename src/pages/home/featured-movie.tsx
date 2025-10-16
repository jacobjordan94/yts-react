import Section from "@/components/ui/section";
import { MovieHero } from "@/components/movie";
import type { Movie } from "@/hooks";
import { cn } from "@/lib/utils";

interface FeaturedMovieProps {
    movie: Movie | undefined;
    error?: Error | null;
    loading?: boolean;
    className?: string;
}

export const FeaturedMovie = ({ movie, error, loading, className }: FeaturedMovieProps) => {
    return (
        <Section.Base
            data-loading={loading}
            data-error={error}
            className={cn("group/Section overflow-hidden p-0 bg-transparent shadow-none", className)}
        >
            <Section.Content asChild className="p-0">
                <MovieHero
                    movie={movie ?? undefined}
                    loading={loading}
                    className="transition-all duration-300 hover:shadow-xl"
                    variant="transparent"
                />
            </Section.Content>
        </Section.Base>
    );
}
