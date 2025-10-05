import Section from "@/components/ui/section";
import { useFeaturedMovie } from "@/hooks";

const FeaturedMovie = () => {

    const { data: movie, error, loading } = useFeaturedMovie();

    return (
        <Section.Base 
            data-loading={loading} 
            data-error={error} 
            className="group/Section overflow-hidden"
        >
            <Section.Header>
                <Section.Title>
                    Featured
                </Section.Title>
            </Section.Header>
            <Section.Content>

            </Section.Content>
        </Section.Base>
    );
}

export default { FeaturedMovie };