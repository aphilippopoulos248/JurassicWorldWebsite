import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LabScene from './scenes/LabScene/LabScene.jsx'
import OpeningScene from './scenes/OpeningScene/OpeningScene.jsx'
import MenuScene from './scenes/MenuScene/MenuScene.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <OpeningScene/>
            </>
          } />
          <Route path="/menu" element={
            <>
              <MenuScene/>
            </>
          } />
          <Route path="/lab" element={
            <> 
              <LabScene/>
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
