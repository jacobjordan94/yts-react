import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Icons, { SortIcon } from "../icons";

interface SortSelectProps extends React.ComponentPropsWithoutRef<"div"> {
  sortBy?: string;
  orderBy?: "asc" | "desc";
  onSortChange: (value: string) => void;
  onOrderChange: (value: "asc" | "desc") => void;
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
  ({ sortBy = "date_added", orderBy = "desc", onSortChange, onOrderChange, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 font-semibold", className)}
        {...props}
      >
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="font-semibold">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <Icons.Sort sortBy={option.value}  />
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => onOrderChange(orderBy === "asc" ? "desc" : "asc")}
          data-order={orderBy}
          className="capitalize font-semibold w-[84px]"
        >
          { orderBy }
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              orderBy === "asc" && "rotate-180"
            )}
          />
        </Button>
      </div>
    );
  }
);

SortSelect.displayName = "SortSelect";

export { SortSelect };
export type { SortSelectProps };
