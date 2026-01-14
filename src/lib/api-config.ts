const API_DOMAINS = ['yts.bz', 'yts.gg', 'yts.mx', 'yts.lt', 'yts.am', 'yts.ag'] as const;

const API_VERSION = 'api/v2';

let workingBaseUrl: string | null = null;

async function testDomain(domain: string): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`https://${domain}/${API_VERSION}/list_movies.json?limit=1`, {
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            return data && data.status === 'ok';
        }
        return false;
    } catch {
        return false;
    }
}

export async function findWorkingApiDomain(): Promise<string> {
    // Try domains in order until we find one that works
    for (const domain of API_DOMAINS) {
        const works = await testDomain(domain);
        if (works) {
            workingBaseUrl = `https://${domain}/${API_VERSION}`;
            return workingBaseUrl;
        }
    }

    // None work, throw error
    throw new Error('All YTS API domains are currently unavailable');
}

export function getApiBaseUrl(): string {
    if (!workingBaseUrl) {
        throw new Error('API not initialized. Call findWorkingApiDomain() first.');
    }
    return workingBaseUrl;
}

export { API_DOMAINS };
