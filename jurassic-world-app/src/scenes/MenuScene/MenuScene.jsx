import React, { useEffect, useState } from 'react';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import Dinos_Data from '../../data/dinos';
import './MenuScene.scss';
import { initAudioSystem,initBGM } from '../../components/audio/audioManager'
import { useNavigate } from 'react-router-dom';
import { initAIIntro, getAIIntro } from '../../components/audio/audioManager';

const MenuScene = () => {
    const navigate = useNavigate();
    const [aiIntroInitialized, setAIIntroInitialized] = useState(false);

    const navToPage = (path, name) => {
       navigate(path, { state: { dinoName: name } });
    }

    useEffect(() => {
        // Play ai voice
        initAudioSystem();
        if (!aiIntroInitialized)
        {
            setTimeout(() => {
                initAIIntro();
            }, 1000);
            setAIIntroInitialized(true);
        }
    });

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
                            <p>Click Here</p>
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuScene;
