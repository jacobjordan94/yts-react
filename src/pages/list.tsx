import * as React from "react";
import { useSearchParams } from "react-router";
import useListMovies, { type ListMoviesParams } from "@/hooks/use-list-movies";
import {
  ListPageRoot,
  ListPageHeader,
  ListPageSearch,
  ListPageFilters,
  ListPageLayoutSwitcher,
  ListPageToolbar,
  ListPageContent,
  ListPagePagination,
} from "./list.primitives";

export default function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [layout, setLayout] = React.useState<"compact" | "default" | "detailed">(
    (searchParams.get("layout") as "compact" | "default" | "detailed") || "default"
  );

  const [params, setParams] = React.useState<ListMoviesParams>({
    limit: 24,
    page: parseInt(searchParams.get("page") || "1", 10),
    quality: searchParams.get("quality") || "all",
    genre: searchParams.get("genre") || "all",
    sort_by: (searchParams.get("sort_by") as ListMoviesParams["sort_by"]) || "date_added",
    order_by: (searchParams.get("order_by") as "asc" | "desc") || "desc",
    query_term: searchParams.get("q") || undefined,
    minimum_rating: searchParams.get("minimum_rating") ? parseInt(searchParams.get("minimum_rating")!, 0) : undefined,
    with_rt_ratings: true,
  });

  const { data, loading, error } = useListMovies(params);

  // Sync state FROM URL when searchParams change (e.g., from dropdown navigation)
  React.useEffect(() => {
    setParams({
      limit: 24,
      page: parseInt(searchParams.get("page") || "1", 10),
      quality: searchParams.get("quality") || "all",
      genre: searchParams.get("genre") || "all",
      sort_by: (searchParams.get("sort_by") as ListMoviesParams["sort_by"]) || "date_added",
      order_by: (searchParams.get("order_by") as "asc" | "desc") || "desc",
      query_term: searchParams.get("q") || undefined,
      minimum_rating: searchParams.get("minimum_rating") ? parseInt(searchParams.get("minimum_rating")!, 10) : undefined,
      with_rt_ratings: true,
    });
    setLayout((searchParams.get("layout") as "compact" | "default" | "detailed") || "default");
  }, [searchParams]);

  // Sync URL FROM state when state changes (e.g., from filter interactions)
  const prevParamsRef = React.useRef(params);
  const prevLayoutRef = React.useRef(layout);

  React.useEffect(() => {
    // Only update URL if state actually changed (not from URL sync above)
    if (prevParamsRef.current === params && prevLayoutRef.current === layout) {
      return;
    }

    prevParamsRef.current = params;
    prevLayoutRef.current = layout;

    const newParams = new URLSearchParams();

    if (params.page && params.page > 1) newParams.set("page", params.page.toString());
    if (params.quality && params.quality !== "all") newParams.set("quality", params.quality);
    if (params.genre && params.genre !== "all") newParams.set("genre", params.genre);
    if (params.sort_by) newParams.set("sort_by", params.sort_by);
    if (params.order_by) newParams.set("order_by", params.order_by);
    if (params.query_term) newParams.set("q", params.query_term);
    if (params.minimum_rating) newParams.set("minimum_rating", String(params.minimum_rating));
    if (layout !== "default") newParams.set("layout", layout);

    setSearchParams(newParams, { replace: true });
  }, [params, layout, setSearchParams]);

  const handleGenreChange = (genre: string) => {
    setParams((prev) => ({ ...prev, genre, page: 1 }));
  };

  const handleQualityChange = (quality: string) => {
    setParams((prev) => ({ ...prev, quality, page: 1 }));
  };

  const handleSortChange = (sort_by: string) => {
    setParams((prev) => ({
      ...prev,
      sort_by: sort_by as ListMoviesParams["sort_by"],
      page: 1,
    }));
  };

  const handleOrderChange = (order_by: "asc" | "desc") => {
    setParams((prev) => ({ ...prev, order_by, page: 1 }));
  };

  const handleSearch = (query: string) => {
    setParams((prev) => ({ ...prev, query_term: query || undefined, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const movies = data?.data?.movies || [];
  const movieCount = data?.data?.movie_count || 0;
  const totalPages = params.limit ? Math.ceil(movieCount / params.limit) : 1;

  // Determine column count based on layout
  const getColumns = () => {
    if (layout === "compact") return 8;
    if (layout === "detailed") return 2;
    return 6;
  };

  return (
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
            onGenreChange={handleGenreChange}
            onQualityChange={handleQualityChange}
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
          />
          <ListPageLayoutSwitcher layout={layout} onLayoutChange={setLayout} />
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
              : "No movies found"
          }
        />
      </div>

      <ListPagePagination
        currentPage={params.page || 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasMore={movies.length === params.limit}
      />
    </ListPageRoot>
  );
}
