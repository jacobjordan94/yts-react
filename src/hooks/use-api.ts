import useFetch from './use-fetch';

const YTS_API_BASE_URL = 'https://yts.mx/api/v2';

interface UseApiOptions {
  skip?: boolean;
}

function buildQueryString(params: Record<string, unknown> | object): string {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
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
  const url = endpoint ? `${YTS_API_BASE_URL}/${endpoint}${queryString}` : null;

  return useFetch<T>(url, { skip: options.skip });
}

export default useApi;
