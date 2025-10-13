import * as React from "react";
import { cn } from "@/lib/utils";
import { GenreSelect } from "@/components/filter/genre-select";
import { QualitySelect } from "@/components/filter/quality-select";
import { SortSelect } from "@/components/filter/sort-select";
import { MovieGrid, type MovieGridProps } from "@/components/layout/movie-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3x3, LayoutGrid, LayoutList } from "lucide-react";
import { ResetFiltersButton } from "@/components/filter/reset-filters";

// Root container for the list page
type ListPageRootProps = React.ComponentPropsWithoutRef<"div">;

const ListPageRoot = React.forwardRef<HTMLDivElement, ListPageRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("container max-w-screen-2xl mx-auto px-4 py-6 min-h-full flex flex-col", className)}
        {...props}
      />
    );
  }
);

ListPageRoot.displayName = "ListPageRoot";

// Header section with title
interface ListPageHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  description?: string;
}

const ListPageHeader = React.forwardRef<HTMLDivElement, ListPageHeaderProps>(
  ({ title = "Browse Movies", description, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-6 space-y-2", className)}
        {...props}
      >
        {title && (
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        )}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    );
  }
);

ListPageHeader.displayName = "ListPageHeader";

// Search bar component
interface ListPageSearchProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

const ListPageSearch = React.forwardRef<HTMLDivElement, ListPageSearchProps>(
  ({ value, onSearch, placeholder = "Search movies...", className, ...props }, ref) => {
    const [searchValue, setSearchValue] = React.useState(value || "");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchValue);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
    );
  }
);

ListPageSearch.displayName = "ListPageSearch";

// Filters section
interface ListPageFiltersProps extends React.ComponentPropsWithoutRef<"div"> {
  genre?: string;
  quality?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  onGenreChange: (value: string) => void;
  onQualityChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onOrderChange: (value: "asc" | "desc") => void;
  onFiltersReset: (e: React.MouseEvent) => any;
}

const ListPageFilters = React.forwardRef<HTMLDivElement, ListPageFiltersProps>(
  ({
    genre,
    quality,
    sortBy,
    orderBy,
    onGenreChange,
    onQualityChange,
    onSortChange,
    onOrderChange,
    onFiltersReset,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-3", className)}
        {...props}
      >
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
          <GenreSelect value={genre} onChange={onGenreChange} />
        </div>
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
          <QualitySelect value={quality} onChange={onQualityChange} />
        </div>
        <div className="w-full sm:w-auto sm:flex-1">
          <SortSelect
            sortBy={sortBy}
            orderBy={orderBy}
            onSortChange={onSortChange}
            onOrderChange={onOrderChange}
          />
        </div>
        <div className="w-auto sm:flex-1">
          <ResetFiltersButton onFilterReset={onFiltersReset} />
        </div>
      </div>
    );
  }
);

ListPageFilters.displayName = "ListPageFilters";

// Layout switcher component
interface ListPageLayoutSwitcherProps extends React.ComponentPropsWithoutRef<"div"> {
  layout: "compact" | "default" | "detailed";
  onLayoutChange: (layout: "compact" | "default" | "detailed") => void;
}

const ListPageLayoutSwitcher = React.forwardRef<HTMLDivElement, ListPageLayoutSwitcherProps>(
  ({ layout, onLayoutChange, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 rounded-lg border p-1 border-white/20", 
          className,
          "*:data-[active=true]:bg-white/20"
        )}
        {...props}
      >
        <Button
          data-active={layout === 'compact'}
          variant={layout === "compact" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3"
          onClick={() => onLayoutChange("compact")}
        >
          <Grid3x3 className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Compact</span>
        </Button>
        <Button
          data-active={layout === 'default'}
          variant={layout === "default" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3"
          onClick={() => onLayoutChange("default")}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Grid</span>
        </Button>
        <Button
          data-active={layout === 'detailed'}
          variant={layout === "detailed" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3"
          onClick={() => onLayoutChange("detailed")}
        >
          <LayoutList className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Detailed</span>
        </Button>
      </div>
    );
  }
);

ListPageLayoutSwitcher.displayName = "ListPageLayoutSwitcher";

// Toolbar combining filters and layout switcher
interface ListPageToolbarProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

const ListPageToolbar = React.forwardRef<HTMLDivElement, ListPageToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ListPageToolbar.displayName = "ListPageToolbar";

// Content section with movies grid
type ListPageContentProps = MovieGridProps;

const ListPageContent = React.forwardRef<HTMLDivElement, ListPageContentProps>(
  ({ className, ...props }, ref) => {
    return <MovieGrid ref={ref} className={cn("mb-6", className)} {...props} />;
  }
);

ListPageContent.displayName = "ListPageContent";

// Pagination component
interface ListPagePaginationProps extends React.ComponentPropsWithoutRef<"div"> {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  hasMore?: boolean;
}

const ListPagePagination = React.forwardRef<HTMLDivElement, ListPagePaginationProps>(
  ({ currentPage, totalPages, onPageChange, hasMore, className, ...props }, ref) => {
    const canGoBack = currentPage > 1;
    const canGoForward = hasMore || (totalPages && currentPage < totalPages);

    return (
      <div
        ref={ref}
        className={cn(
          "list-page-pagination sticky bottom-5 z-10 flex justify-center text-shadow-background text-shadow-xs",
          className
        )}
        {...props}
      >
        <span className="inline-flex justify-center bg-radial from-transparent to-white/20 p-2 px-3 rounded-l-full rounded-r-full supports-[backdrop-filter]:backdrop-blur-2xl">
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoBack}
            className="rounded-l-full rounded-r-full text-shadow-background text-shadow-xs bg-gradient to-transparent from-black"
          >
            Previous
          </Button>
          <div className="flex items-center gap-2 px-4">
            <span className="text-sm font-semibold">Page</span>
            <span className="text-sm font-medium">{currentPage}</span>
            {totalPages && (
              <>
                <span className="text-sm font-semibold">of</span>
                <span className="text-sm font-medium">{totalPages}</span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoForward}
            className="rounded-l-full rounded-r-full text-shadow-background text-shadow-xs"
          >
            Next
          </Button>
        </span>
      </div>
    );
  }
);

ListPagePagination.displayName = "ListPagePagination";

export {
  ListPageRoot,
  ListPageHeader,
  ListPageSearch,
  ListPageFilters,
  ListPageLayoutSwitcher,
  ListPageToolbar,
  ListPageContent,
  ListPagePagination,
};

export type {
  ListPageRootProps,
  ListPageHeaderProps,
  ListPageSearchProps,
  ListPageFiltersProps,
  ListPageLayoutSwitcherProps,
  ListPageToolbarProps,
  ListPageContentProps,
  ListPagePaginationProps,
};
