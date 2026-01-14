import useFetch from './use-fetch';
import { getApiBaseUrl } from '@/lib/api-config';

interface UseApiOptions {
    skip?: boolean;
}

function buildQueryString(params: Record<string, unknown> | object): string {
    const filteredParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

    return filteredParams ? `?${filteredParams}` : '';
}

function useApi<T = unknown>(
    endpoint: string,
    params: Record<string, unknown> | object = {},
    options: UseApiOptions = {}
) {
    const queryString = buildQueryString(params);
    const baseUrl = getApiBaseUrl();
    const url = endpoint && baseUrl ? `${baseUrl}/${endpoint}${queryString}` : null;

    return useFetch<T>(url, { skip: options.skip });
}

export default useApi;
