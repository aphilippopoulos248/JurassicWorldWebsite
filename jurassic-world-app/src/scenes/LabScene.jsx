import { useState, useEffect } from 'react'
import Lab from '../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../components/map/MapComponent'
import map_icon from '../assets/map-icon.png'

function LabScene() {
    const [showMap, setShowMap] = useState(false)

    const toggleMap = () => {
        setShowMap(prev => !prev)
    }

    return (
        <>
        <canvas className="webgl"></canvas>
        {/* <nav>
            <a href="/">Sphere</a>
            <ul>
            <li>Explore</li>
            <li>Create</li>
            </ul>
        </nav> */}
        <Lab/>
        {showMap && 
            <div className="map-wrapper">
                <MapComponent/>
            </div>
        }
        <div className="ui-container">
            <div className="title-container">
                <h1 className="title">Tyrannosaurus Rex</h1>
            </div> 
            <button className="map-button" onClick={toggleMap}>
                <img src={map_icon} alt="" />
            </button>
        </div>

        </>
    )
}

export default LabScene
