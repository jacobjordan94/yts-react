import {
    CalendarPlus,
    Calendar,
    Star,
    Users,
    Download,
    Heart,
    type LucideIcon,
    Leaf,
    Type,
} from '@/components/icons/lucide';

export const SORT_ICONS: Record<string, LucideIcon> = {
    date_added: CalendarPlus,
    title: Type,
    year: Calendar,
    rating: Star,
    peers: Users,
    seeds: Leaf,
    download_count: Download,
    like_count: Heart,
};

export const getSortIcon = (sortBy: string): LucideIcon | undefined => {
    return SORT_ICONS[sortBy.toLowerCase()];
};
