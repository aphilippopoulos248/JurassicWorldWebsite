import { useState, useEffect } from 'react'
import Lab from '../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../components/map/MapComponent'

function LabScene() {
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
        <div className="ui-container">
            <div className="title-container">
                <h1 className="title">Tyrannosaurus Rex</h1>
            </div> 
            <div className="map-button">
                Map
            </div>
        </div>
        {/* <div className="map-wrapper">
            <MapComponent/>
        </div> */}

        </>
    )
}

export default LabScene
