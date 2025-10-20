import { type ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { SearchSlideOut } from '@/components/search';
import { Button } from '@/components/ui/button';
import { DicesIcon, Film, Github, InfoIcon } from '@/components/icons/lucide';
import { ListDropdown } from './index';
import { useListMovies } from '@/hooks';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface SiteHeaderProps extends ComponentPropsWithoutRef<'header'> {
    onSearch?: (value: string) => void;
}

const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
    ({ onSearch, className, ...props }, ref) => {
        const [searchValue, setSearchValue] = useState('');
        const { data } = useListMovies({});
        const navigate = useNavigate();

        const handleSearchSubmit = (value: string) => {
            onSearch?.(value);
        };

        const randomMovie = () => {
            const movieCount = data?.data.movie_count;
            if (!movieCount) return;
            const rand = Math.floor(Math.random() * (movieCount - 1 + 1)) + 1;
            navigate('/movie/' + rand);
        };

        return (
            <header
                ref={ref}
                className={cn(
                    'w-full border-b border-border/40 bg-background/60 font-[Quicksand]',
                    className
                )}
                {...props}
            >
                <div className="container flex h-14 max-w-6xl items-center justify-between px-4 m-auto">
                    <div className="flex items-center gap-4">
                        <NavLink
                            to="/"
                            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                            aria-label="Home"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
                                <Film aria-hidden="true" />
                            </div>
                        </NavLink>
                        <nav className="flex items-center gap-1" aria-label="Main navigation">
                            <ListDropdown />
                            <Button asChild variant="nav">
                                <NavLink to="/about">
                                    <InfoIcon aria-hidden="true" />
                                    <span className="hidden md:inline">About</span>
                                    <span className="sr-only md:hidden">About</span>
                                </NavLink>
                            </Button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-1">
                        <SearchSlideOut
                            className="hidden md:flex"
                            value={searchValue}
                            onChange={setSearchValue}
                            onSubmit={handleSearchSubmit}
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    disabled={!data?.data.movie_count}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={randomMovie}
                                    aria-label="Go to random movie"
                                >
                                    <DicesIcon aria-hidden="true" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-bold font-[Quicksand]">Random movie</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                    <a
                                        href="https://github.com/jacobjordan94/yts-react"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View source on GitHub"
                                    >
                                        <Github className="h-4 w-4" />
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-[Quicksand] font-bold">
                                    View the source code on Github
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>
        );
    }
);

SiteHeader.displayName = 'SiteHeader';

export { SiteHeader };
export type { SiteHeaderProps };
