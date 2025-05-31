import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LabScene from './scenes/LabScene/LabScene.jsx'
import OpeningScene from './scenes/OpeningScene/OpeningScene.jsx'
import MenuScene from './scenes/MenuScene/MenuScene.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { initAudioSystem, initBGM, getBGM } from './components/audio/audioManager.js'

function AppWrapper() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const [bgmInitialized, setBgmInitialized] = useState(false);
  const bgm = getBGM();

  useEffect(() => {
    initAudioSystem();
    if (localStorage.getItem('aiIntroPlayed') === 'true') {
      localStorage.setItem('aiIntroPlayed', 'false');
    }
  }, []);

  useEffect(() => {
    initAudioSystem();

    if (location.pathname !== '/' && !bgmInitialized) {
      initBGM();
      setBgmInitialized(true);
    }
    if (location.pathname === '/' && bgmInitialized) {
      bgm.stop();
      setBgmInitialized(false);
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
