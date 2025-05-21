import { useState, useEffect } from 'react'
import Lab from '../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../components/map/MapComponent'
import map_icon from '../assets/map-icon.png'
import gsap from 'gsap'

function LabScene() {
    const [showMap, setShowMap] = useState(false)

    const toggleMap = () => {
        setShowMap(prev => !prev)
    }

    useEffect(() => {
    // Timeline for animations
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('nav', { y: '-100%' }, { y: "0%" });
        tl.fromTo('.title-container', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 0.5, delay: 0, ease: 'power1.out' });
        tl.fromTo('.title', { opacity: 0 }, { opacity: 1, delay: 0.5 });
    }, [])
   

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
