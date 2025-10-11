import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenreIcon } from "@/components/icons/genre-icon";

interface GenreSelectProps {
  value?: string;
  onChange: (value: string) => void;
  genres?: string[];
}

const DEFAULT_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

const GenreSelect = React.forwardRef<HTMLButtonElement, GenreSelectProps>(
  ({ value, onChange, genres = DEFAULT_GENRES }, ref) => {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger ref={ref} className="font-semibold">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre.toLowerCase()}>
              <GenreIcon genre={genre} />
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

GenreSelect.displayName = "GenreSelect";

export { GenreSelect };
export type { GenreSelectProps };
