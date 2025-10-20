import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef, FormEvent, ReactNode, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import {
    GenreSelect,
    QualitySelect,
    SortSelect,
    ResetFiltersButton,
    MinimumRatingSelect,
    OrderSelect,
} from '@/components/filter';
import { MovieGrid, type MovieGridProps } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid3x3, LayoutGrid, LayoutList } from '@/components/icons/lucide';
import { Page } from '../page';

// Root container for the list page
type ListPageRootProps = ComponentPropsWithoutRef<'main'>;

const ListPageRoot = forwardRef<HTMLDivElement, ListPageRootProps>(
    ({ className, ...props }, ref) => {
        return (
            <Page
                pageName="movies-list"
                ref={ref}
                className={cn('container min-h-full flex flex-col', className)}
                {...props}
            />
        );
    }
);

ListPageRoot.displayName = 'ListPageRoot';

// Header section with title
interface ListPageHeaderProps extends ComponentPropsWithoutRef<'div'> {
    title?: string;
    description?: string;
}

const ListPageHeader = forwardRef<HTMLDivElement, ListPageHeaderProps>(
    ({ title = 'Browse Movies', description, className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('mb-6 space-y-2', className)} {...props}>
                {title && (
                    <h1 className="text-3xl font-bold tracking-tight font-[Quicksand]">{title}</h1>
                )}
                {description && <p className="text-muted-foreground">{description}</p>}
                {children}
            </div>
        );
    }
);

ListPageHeader.displayName = 'ListPageHeader';

// Search bar component
interface ListPageSearchProps extends ComponentPropsWithoutRef<'div'> {
    value?: string;
    onSearch: (value: string) => void;
    placeholder?: string;
}

const ListPageSearch = forwardRef<HTMLDivElement, ListPageSearchProps>(
    ({ value, onSearch, placeholder = 'Search movies...', className, ...props }, ref) => {
        const [searchValue, setSearchValue] = useState(value || '');

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            onSearch(searchValue);
        };

        return (
            <div ref={ref} className={cn('w-full', className)} {...props}>
                <form onSubmit={handleSubmit} className="flex gap-2" role="search">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <Input
                            type="text"
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-9"
                            aria-label="Search movies by title"
                        />
                    </div>
                    <Button type="submit" aria-label="Submit search">
                        Search
                    </Button>
                </form>
            </div>
        );
    }
);

ListPageSearch.displayName = 'ListPageSearch';

// Filters section
interface ListPageFiltersProps extends ComponentPropsWithoutRef<'div'> {
    genre?: string;
    quality?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    minimumRating: number;
    layout: 'compact' | 'default' | 'detailed';
    onGenreChange: (value: string) => void;
    onQualityChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onOrderChange: (value: 'asc' | 'desc') => void;
    onFiltersReset: (e: MouseEvent) => void;
    onMinimumRatingChange: (value: number) => void;
    onLayoutChange: (value: 'compact' | 'default' | 'detailed') => void;
}

const ListPageFilters = forwardRef<HTMLDivElement, ListPageFiltersProps>(
    (
        {
            genre,
            quality,
            sortBy,
            orderBy,
            minimumRating,
            layout,
            onGenreChange,
            onQualityChange,
            onSortChange,
            onOrderChange,
            onFiltersReset,
            onMinimumRatingChange,
            onLayoutChange,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    'grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-12 md:grid-rows-2 w-full',
                    className
                )}
            >
                <GenreSelect
                    className="w-full md:col-span-4"
                    value={genre}
                    onChange={onGenreChange}
                />
                <QualitySelect
                    className="w-full md:col-span-4 md:col-start-5"
                    value={quality}
                    onChange={onQualityChange}
                />
                <SortSelect
                    sortBy={sortBy}
                    onSortChange={onSortChange}
                    className="w-full row-start-2 md:row-start-1 md:col-span-4 md:col-start-9"
                />
                <MinimumRatingSelect
                    className="w-full row-start-3 md:row-start-2 md:col-span-3 md:col-start-1"
                    value={minimumRating}
                    onChange={onMinimumRatingChange}
                />
                <OrderSelect
                    className="w-full md:col-span-2 md:col-start-4 md:row-start-2"
                    orderBy={orderBy}
                    onOrderChange={onOrderChange}
                />
                <ResetFiltersButton
                    className="w-full row-start-3 md:row-start-2 md:col-span-2 md:col-start-6"
                    onFilterReset={onFiltersReset}
                />
                <ListPageLayoutSwitcher
                    className="w-full px-0.5 col-span-full row-start-4 md:col-span-5 md:col-start-8 md:row-start-2"
                    layout={layout}
                    onLayoutChange={onLayoutChange}
                />
            </div>
        );
    }
);

ListPageFilters.displayName = 'ListPageFilters';

// Layout switcher component
interface ListPageLayoutSwitcherProps extends ComponentPropsWithoutRef<'div'> {
    layout: 'compact' | 'default' | 'detailed';
    onLayoutChange: (layout: 'compact' | 'default' | 'detailed') => void;
}

const ListPageLayoutSwitcher = forwardRef<HTMLDivElement, ListPageLayoutSwitcherProps>(
    ({ layout, onLayoutChange, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center justify-stretch *:flex-1 gap-1 rounded-lg border h-9 border-white/20',
                    className,
                    '*:data-[active=true]:bg-white/20'
                )}
                {...props}
            >
                <Button
                    data-active={layout === 'compact'}
                    variant={layout === 'compact' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => onLayoutChange('compact')}
                >
                    <Grid3x3 className="h-4 w-4" />
                    <span className="ml-2">Compact</span>
                </Button>
                <Button
                    data-active={layout === 'default'}
                    variant={layout === 'default' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => onLayoutChange('default')}
                >
                    <LayoutGrid className="h-4 w-4" />
                    <span className="ml-2">Grid</span>
                </Button>
                <Button
                    data-active={layout === 'detailed'}
                    variant={layout === 'detailed' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => onLayoutChange('detailed')}
                >
                    <LayoutList className="h-4 w-4" />
                    <span className="ml-2">Detailed</span>
                </Button>
            </div>
        );
    }
);

ListPageLayoutSwitcher.displayName = 'ListPageLayoutSwitcher';

// Toolbar combining filters and layout switcher
interface ListPageToolbarProps extends ComponentPropsWithoutRef<'div'> {
    children?: ReactNode;
}

const ListPageToolbar = forwardRef<HTMLDivElement, ListPageToolbarProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('mb-6 flex', className)} {...props}>
                {children}
            </div>
        );
    }
);

ListPageToolbar.displayName = 'ListPageToolbar';

// Content section with movies grid
type ListPageContentProps = MovieGridProps;

const ListPageContent = forwardRef<HTMLDivElement, ListPageContentProps>(
    ({ className, ...props }, ref) => {
        return <MovieGrid ref={ref} className={cn('mb-6', className)} {...props} />;
    }
);

ListPageContent.displayName = 'ListPageContent';

// Pagination component
interface ListPagePaginationProps extends ComponentPropsWithoutRef<'div'> {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    hasMore?: boolean;
}

const ListPagePagination = forwardRef<HTMLDivElement, ListPagePaginationProps>(
    ({ currentPage, totalPages, onPageChange, hasMore, className, ...props }, ref) => {
        const canGoBack = currentPage > 1;
        const canGoForward = hasMore || (totalPages && currentPage < totalPages);

        return (
            <div
                ref={ref}
                className={cn(
                    'list-page-pagination sticky bottom-6 z-10 flex justify-center text-shadow-background text-shadow-xs',
                    className
                )}
                {...props}
            >
                <span className="inline-flex rounded-md border justify-center px-3 py-1 drop-shadow-black/20 drop-shadow-md backdrop-blur-md">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={!canGoBack}
                        className="h-7 px-3 text-shadow-background text-shadow-xs bg-gradient to-transparent from-black font-semibold"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2 px-4 font-semibold">
                        <span className="text-sm">Page</span>
                        <span className="text-sm">{currentPage}</span>
                        {totalPages && (
                            <>
                                <span className="text-sm">of</span>
                                <span className="text-sm">{totalPages}</span>
                            </>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={!canGoForward}
                        className="h-7 px-3 text-shadow-background text-shadow-xs font-semibold"
                        size="sm"
                    >
                        Next
                    </Button>
                </span>
            </div>
        );
    }
);

ListPagePagination.displayName = 'ListPagePagination';

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
