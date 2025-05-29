import { useState, useEffect, useRef } from 'react'
import Lab from '../../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../../components/map/MapComponent'
import map_icon from '../../assets/map-icon.png'
import sound_icon from '../../assets/sound-icon.png'
import gsap from 'gsap'
import { getRoarSound, getAIRex } from '../../components/audio/audioManager';

function LabScene() {
    const [showMap, setShowMap] = useState(false);
    const mapRef = useRef(null);
    const roarSound = getRoarSound();
    const aiSound = getAIRex();

    const toggleMap = () => {
        setShowMap(prev => !prev);
    }

    const toggleVoice = () => {
        if (roarSound) {
            roarSound.setVolume(0.01);
            setTimeout(() => {
                roarSound.setVolume(0.1);
            }, 32000);
        }
        if (aiSound && !showMap) {
            setTimeout(() => {
                aiSound.play();
            }, 500);
        }
    }

    useEffect(() => {
    // Timeline for animations
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.ui-container', { yPercent: 120 }, { yPercent: 0, duration: 0.5, delay: 0.5 });
        tl.fromTo('.title-container', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 0.5, delay: 0, ease: 'power1.out' });
        tl.fromTo('.title', { opacity: 0 }, { opacity: 1, delay: 0.5 });
    }, [])

    useEffect(() => {
        if (roarSound) {
            roarSound.setVolume(0.1);
        }
        if (showMap && mapRef.current) {
            gsap.fromTo(mapRef.current,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: 'center', duration: 0.5, ease: 'power1.out' }
            );
            if (roarSound) {
                roarSound.setVolume(0.01);
            }
        }
        else if (!showMap && mapRef.current) {
            gsap.to(mapRef.current, 
                { scaleX: 0, duration: 0.5, ease: 'power1.in' }
            );
        }
    }, [showMap]);
   

    return (
        <>
        <canvas className="webgl"></canvas>
        <Lab/>
        {showMap && 
            <div className="map-overlay">
            <div className="map-wrapper" ref={mapRef}>
                <MapComponent/>
            </div>
            </div>
        }
        <div className="ui-container">
            <button className="map-button" onClick={toggleVoice}>
                <img src={sound_icon} alt="" />
            </button>
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
