import { useState, useEffect, useRef, useCallback } from 'react';

interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

interface FetchOptions extends RequestInit {
    skip?: boolean;
    retries?: number;
    retryDelay?: number;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clean up expired cache entries
const cleanupCache = () => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
        if (now - entry.timestamp >= CACHE_DURATION) {
            cache.delete(key);
        }
    }
};

// Run cleanup every 5 minutes
setInterval(cleanupCache, CACHE_DURATION);

function useFetch<T = unknown>(
    url: string | null,
    options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
    const {
        skip = false,
        retries = DEFAULT_RETRIES,
        retryDelay = DEFAULT_RETRY_DELAY,
        ...fetchOptions
    } = options;
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        error: null,
        loading: !skip && url !== null,
    });

    const abortControllerRef = useRef<AbortController | null>(null);
    const fetchOptionsKey = JSON.stringify(fetchOptions);

    const fetchData = useCallback(
        async (signal: AbortSignal) => {
            if (!url) return;

            const cacheKey = `${url}-${fetchOptionsKey}`;
            const cachedEntry = cache.get(cacheKey);

            if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
                setState({
                    data: cachedEntry.data as T,
                    error: null,
                    loading: false,
                });
                return;
            }

            setState((prev) => ({ ...prev, loading: true }));

            let lastError: Error | null = null;

            // Retry logic
            for (let attempt = 0; attempt <= retries; attempt++) {
                try {
                    const response = await fetch(url, { ...fetchOptions, signal });

                    if (!response.ok) {
                        // Don't retry on 4xx errors (client errors) except 429 (rate limit)
                        if (
                            response.status >= 400 &&
                            response.status < 500 &&
                            response.status !== 429
                        ) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        // Retry on 5xx errors (server errors) and 429 (rate limit)
                        if (attempt < retries) {
                            await delay(retryDelay * (attempt + 1)); // Exponential backoff
                            continue;
                        }

                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    cache.set(cacheKey, { data, timestamp: Date.now() });

                    setState({
                        data,
                        error: null,
                        loading: false,
                    });
                    return;
                } catch (error) {
                    if (error instanceof Error && error.name === 'AbortError') {
                        return;
                    }

                    lastError = error instanceof Error ? error : new Error('An error occurred');

                    // If this is the last attempt, set error state
                    if (attempt === retries) {
                        setState({
                            data: null,
                            error: lastError,
                            loading: false,
                        });
                    } else {
                        // Wait before retrying (unless aborted)
                        await delay(retryDelay * (attempt + 1));
                    }
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [url, fetchOptionsKey, retries, retryDelay]
    );

    const refetch = () => {
        if (url && !skip) {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            fetchData(abortControllerRef.current.signal);
        }
    };

    useEffect(() => {
        if (skip || !url) {
            setState({ data: null, error: null, loading: false });
            return;
        }

        abortControllerRef.current = new AbortController();
        fetchData(abortControllerRef.current.signal);

        return () => {
            abortControllerRef.current?.abort();
        };
    }, [url, skip, fetchData]);

    return { ...state, refetch };
}

export default useFetch;
