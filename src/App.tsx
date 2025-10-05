import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './components/pages/home/home'
import MoviePage from './components/pages/movie/movie';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={ <HomePage /> } />
        <Route path="/movie"  element={ <MoviePage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
