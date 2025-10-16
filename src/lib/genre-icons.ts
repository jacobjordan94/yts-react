import {
    Sword,
    Laugh,
    Drama,
    Skull,
    Heart,
    Sparkles,
    Film,
    Rocket,
    Ghost,
    Zap,
    Users,
    Swords,
    Music,
    Globe,
    Briefcase,
    Mountain,
    Medal,
    BookOpen,
    type LucideIcon,
    Pencil,
    Lasso,
} from 'lucide-react';

export const genreIcons: Record<string, LucideIcon> = {
    // Action & Adventure
    Action: Sword,
    Adventure: Mountain,
    Thriller: Zap,
    War: Swords,

    // Comedy & Drama
    Comedy: Laugh,
    Drama: Drama,
    Romance: Heart,
    Musical: Music,

    // Sci-Fi & Fantasy
    'Sci-Fi': Rocket,
    'Science Fiction': Rocket,
    Fantasy: Sparkles,
    Animation: Pencil,

    // Horror & Mystery
    Horror: Skull,
    Mystery: Ghost,

    // Other genres
    Family: Users,
    Documentary: BookOpen,
    Biography: BookOpen,
    Sport: Medal,
    Western: Lasso,
    Crime: Briefcase,
    History: Globe,
    Music: Music,
    'Film-Noir': Film,

    'All Genres': Film,
};

export const getGenreIcon = (genre: string): LucideIcon => {
    return genreIcons[genre] || Film;
};
