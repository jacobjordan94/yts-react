import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
  debounceMs?: number;
  asChild?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({
    value,
    onChange,
    loading = false,
    placeholder = "Search movies...",
    debounceMs = 300,
    asChild = false,
    className,
    ...props
  }, ref) => {
    const [localValue, setLocalValue] = React.useState(value);
    const timerRef = React.useRef<number>(undefined);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    };

    const handleClear = () => {
      setLocalValue("");
      onChange("");
    };

    React.useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    return (
      <div
        data-loading={loading}
        data-has-results={!!localValue}
        className={cn("relative", className)}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <Input
          ref={ref}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          {...props}
        />
        {localValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
export type { SearchBarProps };
