import React, { useEffect } from 'react';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import Dinos_Data from '../../data/dinos';
import './MenuScene.scss';
import { initAudioSystem,initBGM } from '../../components/audio/audioManager'
import { useNavigate } from 'react-router-dom';

const MenuScene = () => {
    const navigate = useNavigate();

    const navToPage = (path) => {
      navigate(path);
    }

    useEffect(() => {

    }, []);

    return (
        <div className="dinos">
            <div className="dinos-container">
                {Dinos_Data.map((dino, index) => (
                    <div className='dinos-format' key={index}>
                        <h3>{dino.no}</h3>
                        <h2>{dino.name}</h2>
                        <div className='services-readmore'>
                        <button onClick={() => navToPage(`${dino.link}`)}>
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
