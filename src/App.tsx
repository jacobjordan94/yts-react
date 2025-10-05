import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './components/pages/home/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
