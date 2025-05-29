import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

createRoot(document.getElementById('root')).render(
  // Keep strict mode off when testing
  // <StrictMode>
    <App />
  // </StrictMode>,
)
