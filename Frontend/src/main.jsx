import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BusinessIdPrompt from './components/BusinessIdPrompt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/enter-business-id" element={<BusinessIdPrompt />} />
        <Route path="/:businessId" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
