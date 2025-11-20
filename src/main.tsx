import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { findWorkingApiDomain } from './lib/api-config';

const root = createRoot(document.getElementById('root')!);

// Show loading screen
root.render(
    <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Finding available API...</p>
        </div>
    </div>
);

// Find working API domain, then render app
findWorkingApiDomain()
    .then(() => {
        root.render(
            import.meta.env.PROD ? (
                <App />
            ) : (
                <StrictMode>
                    <App />
                </StrictMode>
            )
        );
    })
    .catch((error) => {
        root.render(
            <div className="flex items-center justify-center h-screen">
                <div className="text-center max-w-md p-6">
                    <h1 className="text-2xl font-bold text-destructive mb-4">API Unavailable</h1>
                    <p className="text-muted-foreground mb-4">
                        All YTS API domains are currently unavailable. Please try again later.
                    </p>
                    <p className="text-sm text-muted-foreground">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    });
