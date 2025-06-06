import { useState, useEffect, useRef } from 'react'
import Lab from '../../components/lab/Lab'
import './LabScene.scss'
import MapComponent from '../../components/map/MapComponent'
import map_icon from '../../assets/map-icon.png'
import arrow_icon from '../../assets/arrow-icon.svg'
import sound_icon from '../../assets/sound-icon.png'
import gsap from 'gsap'
import { 
    stopDinoSounds,
    stopAISounds,
    getActiveDinoSound,
    getPhoneSound
    } from '../../components/audio/audioManager';
import { loadAIVoice } from '../../components/loaders/loadAIVoice'
import Dinos_Data from '../../data/dinos'
import { useLocation, useNavigate } from 'react-router-dom';
import { dinoCoords } from '../../components/loaders/dinoCoordinates'

function LabScene() {
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);
    const [playVoice, setPlayVoice] = useState(false);
    const mapRef = useRef(null);
    const activeDinoSounds = getActiveDinoSound();
    const phoneSound = getPhoneSound();
    const [fossilSites, setFossilSites] = useState([]);
    const [aiPlaying, setAiPlaying] = useState(false);


    const phoneSoundRef = useRef(getPhoneSound());

    // Retrieving dino name from menu scene
    const location = useLocation();
    const dinoName = location.state?.dinoName || "Unknown Dino";

    // Loading ai voice based on dino name
    const aiSound = loadAIVoice(dinoName);

    // Retrieving fossil corrdinate data
    useEffect(() => {
        const fetchCoords = async () => {
            const coords = await dinoCoords(dinoName);
            setFossilSites(coords || []);
        };
        fetchCoords();
    }, [dinoName]);

    const toggleMap = () => {
        setShowMap(prev => !prev);
    }

    const toggleVoice = () => {
        setPlayVoice(prev => !prev);
    }

    const goBack = () => {
        navigate('/menu');
    };

    // animate ui
    useEffect(() => {
    // Timeline for animations
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.go-back-button', { yPercent: -130 }, { yPercent: 0, duration: 0.5, delay: 0.5 });
        tl.fromTo('.ui-container', { yPercent: 120 }, { yPercent: 0, duration: 0.5 }, '<');
        tl.fromTo('.title-container', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 0.5, delay: 0, ease: 'power1.out' });
        tl.fromTo('.title', { opacity: 0 }, { opacity: 1, delay: 0.5 });
    }, [])

    // animate map opening
    // dim dino sounds if map is open
    useEffect(() => {
        if (!activeDinoSounds) {return};
        if (!phoneSound) {return};
        // if (!mapRef.current) {return};
        if (showMap) {
            console.log('showing map')
            gsap.fromTo(mapRef.current,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: 'center', duration: 0.5, ease: 'power1.out' }
            );
            activeDinoSounds.setVolume(0.01);
        }
        else if (!showMap) {
            console.log('not showing map')
            // gsap.to(mapRef.current, 
            //     { scaleX: 0, duration: 0.5, ease: 'power1.in' }
            // );
            if (aiSound && !aiSound.isPlaying)     
            {
                activeDinoSounds.setVolume(0.2);
            }   
        }
    }, [showMap]);

    // dim dino sounds and mute phone sound if ai voice is playing
    useEffect(() => {
        if (!activeDinoSounds) {return}

        if (playVoice) {
            if (aiSound) {
                const durationMs = aiSound.buffer?.duration
                    ? aiSound.buffer.duration * 1000 + 1000
                    : 32000;

                activeDinoSounds.setVolume(0.01);
                setTimeout(() => {
                    activeDinoSounds.setVolume(0.2);
                    setAiPlaying(false);
                }, durationMs);
            }
            if (aiSound && !showMap) {
                setTimeout(() => {
                    aiSound.play();
                    setAiPlaying(true);
                    console.log('play ai voice');
                }, 500);
            }
        }
    }, [playVoice]);

    // play phone sound if dinosaur is spinosaurus
    useEffect(() => {
        if (dinoName.toLowerCase() !== 'spinosaurus') {return};

        const phoneSound = phoneSoundRef.current;
        let intervalId;
        let timeoutId;

        const playPhoneSound = () => {
            if (phoneSound && phoneSound.buffer) {
                if (!aiPlaying) {
                    phoneSound.play();
                    phoneSound.setVolume(0.1);
                }
            }
        };

        timeoutId = setTimeout(() => {
            playPhoneSound();
            intervalId = setInterval(playPhoneSound, 20000);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            if (phoneSound && phoneSound.isPlaying) {
                phoneSound.stop();
            }
        };
    }, [dinoName, aiPlaying]);

    // dim phone sound if map is open
    useEffect(() => {
        if (!aiSound) {return};
        if (aiSound) {
            console.log('ai sound!')
        }
        const phoneSound = phoneSoundRef.current;
        if (!phoneSound || !phoneSound.isPlaying) return;

        if (showMap) {
            phoneSound.setVolume(0.01);
        }
        else {
            phoneSound.setVolume(0.1);
        }
    }, [showMap]);

    useEffect(() => {
        return () => {
            console.log('exiting site');
            stopDinoSounds();
            stopAISounds();
        }
    }, []);

    return (
        <>
        <canvas className="webgl"></canvas>
        <Lab dinoName={dinoName}/>
        {showMap && 
            <div className="map-overlay">
            <div className="map-wrapper" ref={mapRef}>
                <MapComponent sites={fossilSites} />
            </div>
            </div>
        }
        <button className="go-back-button" onClick={goBack}>
            <img src={arrow_icon} alt="" />
        </button>
        <div className="ui-container">
            <button id="ai-button" className="ui-button" onClick={toggleVoice}>
                <img src={sound_icon} alt="" />
            </button>
            <div className="title-container">
                <h1 className="title">{dinoName}</h1>
            </div> 
            <button  id="map-button" className="ui-button" onClick={toggleMap}>
                <img src={map_icon} alt="" />
            </button>
        </div>
        </>
    )
}

export default LabScene
