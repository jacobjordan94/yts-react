import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import HomePage from './pages/home'
import MoviePage from './pages/movie';
import ListPage from './pages/list';
import BackgroundImageLayout from './layouts/background-image';
import { SiteHeader } from '@/components/header/site-header';

function App() {

  return (
      <BrowserRouter>
        <div className="flex flex-col h-screen items-stretch">
          <ApplicationHeader />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route element={ <BackgroundImageLayout /> }>
                <Route index path="/" element={ <HomePage /> } />
                <Route path="/list" element={ <ListPage /> } />
                <Route path="/movie/:id"  element={ <MoviePage /> } />
              </Route>
            </Routes>
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

export default App;
