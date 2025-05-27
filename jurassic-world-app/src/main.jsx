import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // Keep strict mode off when testing
  // <StrictMode>
    <App />
  // </StrictMode>,
)
