import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import TrackingPage from './pages/trackingpage.tsx'
import DetailsPage from './pages/detailspage.tsx'

createRoot(document.getElementById('root')!).render(
  // <div className="w-screen h-screen bg-white"></div>
   <BrowserRouter>
    <Routes>
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="*" element={<Navigate to="/tracking" replace />} />
    </Routes>
   </BrowserRouter>
)
