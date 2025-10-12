import Section from "@/components/ui/section";
import { MovieCard } from "@/components/movie";
import type { Movie } from "@/hooks";
import { Link } from "react-router";

export const FeaturedMovies = ({ movies, preview = 5, ...props }: { movies?: Movie[], preview?: number }) =>
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
