import React, { useEffect } from 'react';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import Dinos_Data from '../../data/dinos';
import './MenuScene.scss';

const MenuScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Audio setup
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const bgMusic = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('../music/jurassic-world-bgm2.mp3', function (buffer) {
        bgMusic.setBuffer(buffer);
        bgMusic.setLoop(true);
        bgMusic.setVolume(1);
        bgMusic.play();
    });

    return () => {
      if (bgMusic && bgMusic.isPlaying) {
        bgMusic.stop();
      }
    };
  }, []);

  return (
    <div className="dinos">
      <div className="dinos-container">
        {Dinos_Data.map((dino, index) => (
          <div className='dinos-format' key={index}>
            <h3>{dino.no}</h3>
            <h2>{dino.name}</h2>
            <div className='services-readmore'>
              <a href={dino.link}>
                <p>Click Here</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuScene;
