import { useState, useEffect, useRef, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface FetchOptions extends RequestInit {
  skip?: boolean;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function useFetch<T = unknown>(
  url: string | null,
  options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
  const { skip = false, ...fetchOptions } = options;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: !skip && url !== null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchOptionsKey = JSON.stringify(fetchOptions);

  const fetchData = useCallback(async (signal: AbortSignal) => {
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

    try {
      const response = await fetch(url, { ...fetchOptions, signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      cache.set(cacheKey, { data, timestamp: Date.now() });

      setState({
        data,
        error: null,
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setState({
        data: null,
        error: error instanceof Error ? error : new Error('An error occurred'),
        loading: false,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, fetchOptionsKey]);

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
