import React, { useEffect, useState } from 'react';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import Dinos_Data from '../../data/dinos';
import './MenuScene.scss';
import { initAudioSystem,initBGM } from '../../components/audio/audioManager'
import { useNavigate } from 'react-router-dom';
import { initAIIntro, getAIIntro } from '../../components/audio/audioManager';
import gsap from 'gsap';

const MenuScene = () => {
    const navigate = useNavigate();
    const [aiIntroInitialized, setAIIntroInitialized] = useState(false);

    const navToPage = (path, name) => {
       navigate(path, { state: { dinoName: name } });
    }

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.menu-format', { scaleY: 0 }, { scaleY: 1, duration: .5, delay: .2, ease: 'power1.out', stagger: 0.2 });
        // tl.fromTo('.enter p', { opacity: 0 }, { opacity: 0.8, duration: 5, delay: 0.5 });
    }, []);

    useEffect(() => {
        // Play ai voice
        initAudioSystem();

        const aiIntroAlreadyPlayed = localStorage.getItem('aiIntroPlayed') === 'true';

        if (!aiIntroAlreadyPlayed)
        {
            setTimeout(() => {
                initAIIntro();
            }, 1000);
            localStorage.setItem('aiIntroPlayed', 'true');
        }
        return () => {
            const aiIntro = getAIIntro();
            if (aiIntro) {
                if (typeof aiIntro.stop === 'function') {
                    aiIntro.stop();
                } else if (typeof aiIntro.pause === 'function') {
                    aiIntro.pause();
                } else if (typeof aiIntro.currentTime !== 'undefined') {
                    aiIntro.currentTime = aiIntro.duration; // jump to end
                }
            }
        }
        }, []);

    return (
        <div className="menu">
            <div className="menu-title">Select A Dino</div>
            <div className="menu-container">
                {Dinos_Data.map((dino, index) => (
                    <div className='menu-format' key={index}>
                        <h3>{dino.no}</h3>
                        <h2>{dino.name}</h2>
                        <div className='services-readmore'>
                        <button onClick={() => navToPage(`${dino.link}`, dino.name)}>
                            <p>View Dino</p>
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuScene;
