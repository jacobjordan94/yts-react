import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icons from "../icons";
import { cn } from "@/lib/utils";

interface SortSelectProps extends React.ComponentPropsWithoutRef<"div"> {
  sortBy?: string;
  onSortChange: (value: string) => void;
  className?: string;
}

const SORT_OPTIONS = [
  { value: "date_added", label: "Date Added" },
  { value: "title", label: "Title" },
  { value: "year", label: "Year" },
  { value: "rating", label: "Rating" },
  { value: "peers", label: "Peers" },
  { value: "seeds", label: "Seeds" },
  { value: "download_count", label: "Downloads" },
  { value: "like_count", label: "Likes" },
];

const SortSelect = React.forwardRef<HTMLDivElement, SortSelectProps>(
  ({ sortBy = "date_added", onSortChange, className, ...props }, ref) => {
    return (
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className={cn("w-[180px] font-semibold", className)}>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent {...props} ref={ref} className="font-semibold">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <Icons.Sort sortBy={option.value}  />
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

SortSelect.displayName = "SortSelect";

export { SortSelect };
export type { SortSelectProps };
