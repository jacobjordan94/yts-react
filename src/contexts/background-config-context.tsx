import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

interface BackgroundConfig {
    image?: string | undefined;
    darkness?: number | undefined;
    blur?: number | undefined;
}

interface BackgroundConfigContextValue {
    backgroundConfig: BackgroundConfig;
    setBackgroundConfig: (config: Partial<BackgroundConfig>) => void;
}

const BackgroundConfigContext = createContext<BackgroundConfigContextValue | undefined>(undefined);

export function BackgroundConfigProvider({ children }: { children: ReactNode }) {
    const [backgroundConfig, setBackgroundConfigState] = useState<BackgroundConfig>({});

    const setBackgroundConfig = useCallback((config: Partial<BackgroundConfig>) => {
        setBackgroundConfigState(config);
    }, []);

    const contextValue = useMemo(
        () => ({
            backgroundConfig,
            setBackgroundConfig,
        }),
        [backgroundConfig, setBackgroundConfig]
    );

    return (
        <BackgroundConfigContext.Provider value={contextValue}>
            {children}
        </BackgroundConfigContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBackgroundConfig() {
    const context = useContext(BackgroundConfigContext);
    if (context === undefined) {
        throw new Error('useBackgroundConfig must be used within a BackgroundConfigProvider');
    }
    return context;
}
