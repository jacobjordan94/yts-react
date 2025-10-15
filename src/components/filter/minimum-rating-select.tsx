import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimumRatingSelectProps {
  value?: number;
  onChange: (value: number) => void;
  className?: string;
}

const RATING_OPTIONS = [
  { value: 0, label: "All Ratings" },
  { value: 5, label: "5+ Stars" },
  { value: 6, label: "6+ Stars" },
  { value: 7, label: "7+ Good" },
  { value: 8, label: "8+ Great" },
  { value: 9, label: "9+ Masterpiece" },
];

const MinimumRatingSelect = React.forwardRef<HTMLButtonElement, MinimumRatingSelectProps>(
  ({ value = 0, onChange, className }, ref) => {
    return (
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger ref={ref} className={cn("font-semibold", className)}>
          <SelectValue placeholder="All Ratings" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {RATING_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              <Star className="fill-current" />
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

MinimumRatingSelect.displayName = "MinimumRatingSelect";

export { MinimumRatingSelect };
export type { MinimumRatingSelectProps };
