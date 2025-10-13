import * as React from "react";
import { NavLink, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { SearchSlideOut } from "@/components/search/search-slide-out";
import { Button } from "@/components/ui/button";
import { DicesIcon, Film, Github, InfoIcon } from "lucide-react";
import ListDropdown from "./list-dropdown";
import { useListMovies } from "@/hooks";

interface SiteHeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  onSearch?: (value: string) => void;
}

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  ({ onSearch, className, ...props }, ref) => {
    const [searchValue, setSearchValue] = React.useState("");
    const { data } = useListMovies({});
    const navigate = useNavigate();

    const handleSearchSubmit = (value: string) => {
      onSearch?.(value);
    };

    const randomMovie = () => {
      const movieCount = data?.data.movie_count;
      if(!movieCount) return;
      const rand = Math.floor(Math.random() * (movieCount - 1 + 1)) + 1;
      navigate('/movie/' + rand);
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
            <NavLink
              to="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
                <Film />
              </div>
              <span className="font-semibold text-base tracking-tight">MovieDB</span>
            </NavLink>
            <nav className="hidden md:flex items-center gap-1">
              <ListDropdown />
              <Button asChild variant="nav">
                <NavLink to="/about">
                  <InfoIcon />
                  About
                </NavLink>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-1">
            <SearchSlideOut
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={handleSearchSubmit}
            />
            <Button disabled={!data?.data.movie_count} variant="ghost" size="icon" className="h-8 w-8" onClick={randomMovie}>
              <DicesIcon />
            </Button>
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
