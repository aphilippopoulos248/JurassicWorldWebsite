import { useState, useEffect, useRef } from 'react'
import Lab from '../../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../../components/map/MapComponent'
import map_icon from '../../assets/map-icon.png'
import sound_icon from '../../assets/sound-icon.png'
import gsap from 'gsap'
import { getRexSounds, getAIRex } from '../../components/audio/audioManager';
import Dinos_Data from '../../data/dinos'
import { useLocation } from 'react-router-dom';

function LabScene() {
    const [showMap, setShowMap] = useState(false);
    const [playVoice, setPlayVoice] = useState(false);
    const mapRef = useRef(null);
    const roarSound = getRexSounds();
    const aiSound = getAIRex();

    // Retrieving dino name from menu scene
    const location = useLocation();
    const dinoName = location.state?.dinoName || "Unknown Dino";

    const toggleMap = () => {
        setShowMap(prev => !prev);
    }

    const toggleVoice = () => {
        setPlayVoice(prev => !prev);
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
            roarSound.setVolume(0.2);
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

    useEffect(() => {
        if (playVoice) {
           if (roarSound) {
            roarSound.setVolume(0.01);
            setTimeout(() => {
                roarSound.setVolume(0.2);
            }, 32000);
            }
            if (aiSound && !showMap) {
                setTimeout(() => {
                    aiSound.play();
                }, 500);
            }
        }
    }, [playVoice]);
   

    return (
        <>
        <canvas className="webgl"></canvas>
        <Lab dinoName={dinoName}/>
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
                <h1 className="title">{dinoName}</h1>
            </div> 
            <button className="map-button" onClick={toggleMap}>
                <img src={map_icon} alt="" />
            </button>
        </div>

        </>
    )
}

export default LabScene
