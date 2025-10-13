import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import { lazy, Suspense } from 'react'
import BackgroundImageLayout from './layouts/background-image';
import { SiteHeader } from '@/components/header/site-header';
import { ErrorBoundary } from '@/components/error-boundary';
import { Popcorn } from 'lucide-react';

// Lazy load route components
const HomePage = lazy(() => import('./pages/home'))
const MoviePage = lazy(() => import('./pages/movie'))
const ListPage = lazy(() => import('./pages/list'))
const AboutPage = lazy(() => import('./pages/about'))
const NotFoundPage = lazy(() => import('./pages/not-found'))

function App() {

  return (
      <BrowserRouter>
        <div className="flex flex-col h-screen items-stretch">
          <ApplicationHeader />
          <div className="flex-1 overflow-auto">
            <ErrorBoundary>
              <Suspense fallback={<LoadingComponent/>}>
                <Routes>
                  <Route element={ <BackgroundImageLayout /> }>
                    <Route index path="/" element={ <HomePage /> } />
                    <Route path="/list" element={ <ListPage /> } />
                    <Route path="/movie/:id"  element={ <MoviePage /> } />
                  </Route>
                  <Route path="/about" element={ <AboutPage /> } />
                  <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
  )
}

function ApplicationHeader() {
  const navigate = useNavigate();
  function handleQuery(query: string) {
    query = query.trim();
    if(!query) return;
    query = query.split(' ').join('+');
    navigate('/list/?q=' + query + '&sort_by=date_added&order_by=desc');
  }
  return <SiteHeader onSearch={handleQuery}></SiteHeader>;
}

function LoadingComponent() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <Popcorn className='size-14 animate-bounce' />
      <span className='font-semibold'>
        Getting the Popcorn ready...
      </span>
    </div>
  );
}

export default App;
