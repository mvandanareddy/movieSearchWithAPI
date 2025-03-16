import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MovieSearch from './components/movieSearch.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='justtify-content-center'> <MovieSearch /></div>
   
  </StrictMode>,
)
