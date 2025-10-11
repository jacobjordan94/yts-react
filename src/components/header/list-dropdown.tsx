import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type ListOption = {
  label: string;
  params?: Record<string, string | number>;
};

type ListGroup = {
  label: string;
  options: ListOption[];
};

const LIST_GROUPS: ListGroup[] = [
  {
    label: "Popular",
    options: [
      { label: "Recently Added", params: { sort_by: "date_added" } },
      { label: "Most Downloads", params: { sort_by: "download_count" } },
      { label: "Highest Rated", params: { sort_by: "rating" } },
      { label: "Featured", params: { sort_by: "date_added", minimum_rating: 9 } },
    ],
  },
  {
    label: "Community",
    options: [
      { label: "Most Liked", params: { sort_by: "like_count", minimum_rating: 7 } },
      { label: "Currently Trending", params: { sort_by: "peers", minimum_rating: 6 } },
      { label: "Best Availability", params: { sort_by: "seeds" } },
    ],
  },
  {
    label: "Quality",
    options: [
      { label: "Best in 4K", params: { sort_by: "rating", quality: "2160p" } },
      { label: "Popular HD", params: { sort_by: "download_count", quality: "1080p" } },
      { label: "Quick Downloads", params: { quality: "720p", sort_by: "seeds" } },
    ],
  },
  {
    label: "By Genre",
    options: [
      { label: "Top Action", params: { genre: "action", sort_by: "rating", minimum_rating: 7 } },
      { label: "New Horror", params: { genre: "horror", sort_by: "year", order_by: "desc" } },
      { label: "Fan Favorite Comedies", params: { genre: "comedy", sort_by: "like_count" } },
      { label: "Best Sci-Fi", params: { genre: "sci-fi", minimum_rating: 8 } },
    ],
  },
  {
    label: "Discovery",
    options: [
      { label: "Masterpieces (9+)", params: { minimum_rating: 9 } },
      { label: "Critically Acclaimed (8+)", params: { minimum_rating: 8, sort_by: "rating" } },
      { label: "Latest Releases", params: { sort_by: "year", order_by: "desc" } },
      { label: "Alphabetical", params: { sort_by: "title", order_by: "asc" } },
      { label: "Hidden Gems", params: { minimum_rating: 7, sort_by: "peers", order_by: "asc" } },
    ],
  },
];

const ListDropdown = () => {
  const navigate = useNavigate();

  const buildUrl = (params?: Record<string, string | number>) => {
    if (!params) return "/list/";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    return `/list/?${searchParams.toString()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="font-semibold" variant="ghost">
          List
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="sm:grid sm:grid-cols-3 sm:p-2 sm-pb-4 ">
        {LIST_GROUPS.map((group, groupIndex) => (
          <div key={group.label}>
            <DropdownMenuLabel className="text-base font-font-semibold text-muted-foreground">
              {group.label}
            </DropdownMenuLabel>
            {group.options.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onClick={() => navigate(buildUrl(option.params))}
                className="font-semibold text-white/80"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
            {groupIndex < LIST_GROUPS.length - 1 && <DropdownMenuSeparator className="sm:hidden" />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListDropdown;