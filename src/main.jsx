// Startpunkten för hela appen. Här mountar vi React till HTML-elementet med id="root".
// StrictMode är bara aktivt under utveckling och hjälper oss hitta vanliga misstag.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
