import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router';
import { lazy, Suspense, useLayoutEffect, useRef, type RefObject } from 'react';
import { SiteHeader } from '@/components/header';
import { ErrorBoundary } from '@/components/error-boundary';
import { Popcorn } from '@/components/icons/lucide';
import {
    BackgroundConfigProvider,
    useBackgroundConfig,
} from '@/contexts/background-config-context';
import { PageBackground } from '@/components/layout';
import { SiteDisclaimerDialog } from '@/components/dialogs';
import { OfflineIndicator } from '@/components/offline-indicator';

// Lazy load route components
const HomePage = lazy(() => import('./pages/home/home'));
const MoviePage = lazy(() => import('./pages/movie/movie'));
const ListPage = lazy(() => import('./pages/list/list'));
const AboutPage = lazy(() => import('./pages/about/about'));
const NotFoundPage = lazy(() => import('./pages/not-found/not-found'));

function App() {
    return (
        <BackgroundConfigProvider>
            <AppContent />
            <SiteDisclaimerDialog />
            <OfflineIndicator />
        </BackgroundConfigProvider>
    );
}

function AppContent() {
    const { backgroundConfig } = useBackgroundConfig();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <PageBackground {...backgroundConfig}>
            <BrowserRouter>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
                >
                    Skip to main content
                </a>
                <div className="flex flex-col h-screen items-stretch">
                    <ApplicationHeader />
                    <main
                        id="main-content"
                        className="flex-1 overflow-auto scroll-smooth"
                        ref={ref}
                    >
                        <ScrollHelper scrollRef={ref} />
                        <ErrorBoundary>
                            <Suspense fallback={<LoadingComponent />}>
                                <Routes>
                                    <Route index path="/" element={<HomePage />} />
                                    <Route path="/list" element={<ListPage />} />
                                    <Route path="/movie/:id" element={<MoviePage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </Suspense>
                        </ErrorBoundary>
                    </main>
                </div>
            </BrowserRouter>
        </PageBackground>
    );
}

function ScrollHelper({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
    const location = useLocation();
    const prevLocationRef = useRef({ pathname: location.pathname, search: location.search });

    useLayoutEffect(() => {
        if (!scrollRef.current) return;

        const prev = prevLocationRef.current;
        const getPattern = (path: string) => path.split('/')[1] || path;
        const isSameRoute =
            getPattern(prev.pathname) === getPattern(location.pathname) &&
            (prev.pathname !== location.pathname || prev.search !== location.search);

        scrollRef.current.scrollTo({ top: 0, behavior: isSameRoute ? 'smooth' : 'instant' });
        prevLocationRef.current = { pathname: location.pathname, search: location.search };
    }, [location.pathname, location.search, scrollRef]);

    return null;
}

function ApplicationHeader() {
    const navigate = useNavigate();
    function handleQuery(query: string) {
        query = query.trim();
        if (!query) return;
        query = query.split(' ').join('+');
        navigate('/list/?q=' + query + '&sort_by=date_added&order_by=desc');
    }
    return <SiteHeader onSearch={handleQuery}></SiteHeader>;
}

function LoadingComponent() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
            <Popcorn className="size-14 animate-bounce" />
            <span className="font-semibold font-[Quicksand]">Getting the Popcorn ready...</span>
        </div>
    );
}

export default App;
