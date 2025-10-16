import { useCallback, useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T): [T | undefined, (value: T) => void] {
    // Initialize synchronously from localStorage to avoid hydration mismatch
    const [data, setData] = useState<T>(() => {
        // SSR safety check
        if (typeof window === 'undefined') {
            return defaultValue;
        }

        if (!key) return defaultValue;

        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                // Try to parse as JSON, fall back to raw string
                return JSON.parse(stored) as T;
            } catch {
                // If it's not valid JSON, return as-is (for string values)
                return stored as T;
            }
        }

        // Set default value in localStorage
        const serialized =
            typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue);
        localStorage.setItem(key, serialized);
        return defaultValue;
    });

    // Setter function that updates both state and localStorage
    const setValue = useCallback(
        (value: T) => {
            if (typeof window === 'undefined') return;

            setData(value);
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, serialized);
        },
        [key]
    );

    // Sync across tabs - listen for storage events
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const parsed = JSON.parse(e.newValue) as T;
                    setData(parsed);
                } catch {
                    setData(e.newValue as T);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    return [data, setValue];
}

export default useLocalStorage;
