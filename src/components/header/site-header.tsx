import * as React from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { SearchSlideOut } from "@/components/search/search-slide-out";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import ListDropdown from "./list-dropdown";

interface SiteHeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  onSearch?: (value: string) => void;
}

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  ({ onSearch, className, ...props }, ref) => {
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearchSubmit = (value: string) => {
      onSearch?.(value);
    };

    return (
      <header
        ref={ref}
        className={cn(
          "w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container flex h-14 max-w-6xl items-center justify-between px-4 m-auto">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
                Y
              </div>
              <span className="font-semibold text-base tracking-tight">YTS Movies</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <ListDropdown />
            </nav>
          </div>
          <div className="flex items-center gap-1">
            <SearchSlideOut
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={handleSearchSubmit}
            />
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

SiteHeader.displayName = "SiteHeader";

export { SiteHeader };
export type { SiteHeaderProps };
