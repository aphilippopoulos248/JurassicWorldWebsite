import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LabScene from './scenes/LabScene/LabScene.jsx'
import OpeningScene from './scenes/OpeningScene/OpeningScene.jsx'
import MenuScene from './scenes/MenuScene/MenuScene.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { initAudioSystem, initBGM } from './components/audio/audioManager.js'

function AppWrapper() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const [bgmInitialized, setBgmInitialized] = useState(false);

  useEffect(() => {
    initAudioSystem();

    if (location.pathname === '/menu' && !bgmInitialized) {
      initBGM();
      setBgmInitialized(true);
    }
  }, [location, bgmInitialized])

  return (
    <Routes>
      <Route path="/" element={<OpeningScene />} />
      <Route path="/menu" element={<MenuScene />} />
      <Route path="/lab" element={<LabScene />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
