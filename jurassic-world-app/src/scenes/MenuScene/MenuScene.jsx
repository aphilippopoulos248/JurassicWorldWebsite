import React from 'react'
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import Dinos_Data from '../../data/dinos';

const MenuScene = () => {
    const scene = new THREE.Scene();
    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);
    // Play music
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const bgMusic = new THREE.Audio(listener);

    audioLoader.load('../music/jurassic-world-bgm2.mp3', function (buffer) {
        bgMusic.setBuffer(buffer);
        bgMusic.setLoop(true);
        bgMusic.setVolume(1);
        bgMusic.play();
    });
    
  return (
    <div className="dinos-container">
        {Dinos_Data.map((dino, index)=>{
            return <div className='dinos-format'>
                <h3>{dino.no}</h3>
                <h2>{dino.name}</h2>
                <div className='services-readmore'>
                    <a href={dino.link}>
                        <p>Click Here</p>
                        {/* <img src={arrow_icon} alt="" /> */}
                    </a>
                </div>
            </div>
        })}
    </div>
  )
}

export default MenuScene
