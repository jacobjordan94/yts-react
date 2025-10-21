import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import useListMovies, { type ListMoviesParams } from '@/hooks/use-list-movies';
import {
    ListPageRoot,
    ListPageHeader,
    ListPageSearch,
    ListPageFilters,
    ListPageToolbar,
    ListPageContent,
    ListPagePagination,
} from './list.primitives';
import Seo from '@/components/seo';
import { useBackgroundConfig } from '@/contexts/background-config-context';

export default function ListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setBackgroundConfig } = useBackgroundConfig();

    // Initialize state from URL params
    const [layout, setLayout] = useState<'compact' | 'default' | 'detailed'>(
        (searchParams.get('layout') as 'compact' | 'default' | 'detailed') || 'default'
    );

    const [params, setParams] = useState<ListMoviesParams>({
        limit: 24,
        page: parseInt(searchParams.get('page') || '1', 10),
        quality: searchParams.get('quality') || 'all',
        genre: searchParams.get('genre') || 'all',
        sort_by: (searchParams.get('sort_by') as ListMoviesParams['sort_by']) || 'date_added',
        order_by: (searchParams.get('order_by') as 'asc' | 'desc') || 'desc',
        query_term: searchParams.get('q') || undefined,
        minimum_rating: searchParams.get('minimum_rating')
            ? parseInt(searchParams.get('minimum_rating')!, 10)
            : undefined,
        with_rt_ratings: true,
    });

    const { data, loading, error } = useListMovies(params);

    // Sync state FROM URL when searchParams change (e.g., from dropdown navigation)
    useEffect(() => {
        setParams({
            limit: 24,
            page: parseInt(searchParams.get('page') || '1', 10),
            quality: searchParams.get('quality') || 'all',
            genre: searchParams.get('genre') || 'all',
            sort_by: (searchParams.get('sort_by') as ListMoviesParams['sort_by']) || 'date_added',
            order_by: (searchParams.get('order_by') as 'asc' | 'desc') || 'desc',
            query_term: searchParams.get('q') || undefined,
            minimum_rating: searchParams.get('minimum_rating')
                ? parseInt(searchParams.get('minimum_rating')!, 10)
                : undefined,
            with_rt_ratings: true,
        });
        setLayout((searchParams.get('layout') as 'compact' | 'default' | 'detailed') || 'default');
    }, [searchParams]);

    // Sync URL FROM state when state changes (e.g., from filter interactions)
    const prevParamsRef = useRef(params);
    const prevLayoutRef = useRef(layout);

    useEffect(() => {
        // Only update URL if state actually changed (not from URL sync above)
        if (prevParamsRef.current === params && prevLayoutRef.current === layout) {
            return;
        }

        prevParamsRef.current = params;
        prevLayoutRef.current = layout;

        const newParams = new URLSearchParams();

        if (params.page && params.page > 1) newParams.set('page', params.page.toString());
        if (params.quality && params.quality !== 'all') newParams.set('quality', params.quality);
        if (params.genre && params.genre !== 'all') newParams.set('genre', params.genre);
        if (params.sort_by) newParams.set('sort_by', params.sort_by);
        if (params.order_by) newParams.set('order_by', params.order_by);
        if (params.query_term) newParams.set('q', params.query_term);
        if (params.minimum_rating) newParams.set('minimum_rating', String(params.minimum_rating));
        if (layout !== 'default') newParams.set('layout', layout);

        setSearchParams(newParams, { replace: true });
    }, [params, layout, setSearchParams]);

    useEffect(() => {
        if (!setBackgroundConfig || !data) return;
        const firstMovie = data.data.movies.at(0);
        setBackgroundConfig({
            image:
                firstMovie?.background_image ||
                firstMovie?.background_image_original ||
                './kenobi.webp',
        });
    }, [setBackgroundConfig, data]);

    const handleGenreChange = (genre: string) => {
        setParams((prev) => ({ ...prev, genre, page: 1 }));
    };

    const handleQualityChange = (quality: string) => {
        setParams((prev) => ({ ...prev, quality, page: 1 }));
    };

    const handleSortChange = (sort_by: string) => {
        setParams((prev) => ({
            ...prev,
            sort_by: sort_by as ListMoviesParams['sort_by'],
            page: 1,
        }));
    };

    const handleOrderChange = (order_by: 'asc' | 'desc') => {
        setParams((prev) => ({ ...prev, order_by, page: 1 }));
    };

    const handleSearch = (query: string) => {
        setParams((prev) => ({ ...prev, query_term: query || undefined, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMinimumRatingsChange = (rating: number) => {
        setParams((prev) => ({ ...prev, minimum_rating: rating || 0, page: 1 }));
    };

    const handleResetFilters = () => {
        setParams({
            limit: 24,
            page: 1,
            quality: 'all',
            genre: 'all',
            sort_by: 'date_added',
            order_by: 'desc',
            query_term: undefined,
            with_rt_ratings: true,
            minimum_rating: 0,
        });
    };

    const movies = data?.data?.movies || [];
    const movieCount = data?.data?.movie_count || 0;
    const totalPages = params.limit ? Math.ceil(movieCount / params.limit) : 1;

    // Determine column count based on layout
    const getColumns = () => {
        if (layout === 'compact') return 8;
        if (layout === 'detailed') return 3;
        return 6;
    };

    const seoTitle = params.query_term
        ? `Search: ${params.query_term} - YTS Movie Browser`
        : params.genre && params.genre !== 'all'
          ? `${params.genre.at(0)?.toUpperCase() + params.genre.slice(1)} Movies - YTS Movie Browser`
          : 'Browse Movies - YTS Movie Browser';

    const seoDescription = params.query_term
        ? `Search results for "${params.query_term}". Browse and discover movies with high-quality torrents.`
        : params.genre && params.genre !== 'all'
          ? `Browse ${params.genre} movies. Find high-quality torrents and detailed information.`
          : 'Discover and search through thousands of movies. Find high-quality torrents with detailed information.';

    return (
        <>
            <Seo title={seoTitle} description={seoDescription} pathname="/list" />
            <ListPageRoot>
                <div className="flex-1">
                    <ListPageHeader
                        title="Browse Movies"
                        description="Discover and search through thousands of movies"
                    />

                    <div className="mb-6">
                        <ListPageSearch
                            value={params.query_term}
                            onSearch={handleSearch}
                            placeholder="Search movies by title..."
                        />
                    </div>

                    <ListPageToolbar>
                        <ListPageFilters
                            genre={params.genre}
                            quality={params.quality}
                            sortBy={params.sort_by}
                            orderBy={params.order_by}
                            minimumRating={params.minimum_rating || 0}
                            layout={layout}
                            onLayoutChange={setLayout}
                            onGenreChange={handleGenreChange}
                            onQualityChange={handleQualityChange}
                            onSortChange={handleSortChange}
                            onOrderChange={handleOrderChange}
                            onFiltersReset={handleResetFilters}
                            onMinimumRatingChange={handleMinimumRatingsChange}
                        />
                    </ListPageToolbar>

                    {error && (
                        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                            <p className="text-sm text-destructive">
                                Failed to load movies. Please try again later.
                            </p>
                        </div>
                    )}

                    <ListPageContent
                        movies={movies}
                        loading={loading}
                        empty={!loading && movies.length === 0}
                        variant={layout}
                        columns={getColumns()}
                        rows={5}
                        emptyMessage={
                            params.query_term
                                ? `No movies found matching "${params.query_term}"`
                                : 'No movies found'
                        }
                    />
                </div>

                <ListPagePagination
                    data-hidden={totalPages < 2}
                    className="transition-opacity duration-300 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none"
                    currentPage={params.page || 1}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    hasMore={movies.length === params.limit}
                />
            </ListPageRoot>
        </>
    );
}
