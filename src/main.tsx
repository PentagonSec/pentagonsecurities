import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TrackingPage from './pages/trackingpage.tsx'
import DetailsPage from './pages/detailspage.tsx'

createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
   </BrowserRouter>
)
