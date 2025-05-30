import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import gsap from 'gsap';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { setBackground } from '../bg/background.js';
import { loadPlatform } from './platform/platform.js';
import { loadRex } from "./rex/rex.js";
import { loadRaptor } from "./raptor/raptor.js";
import { loadDino } from "../loaders/loadDino.js";
import Dinos_Data from '../../data/dinos';
import { useEffect, useRef } from 'react'
import { initRexSounds, initRaptorSounds, initAIRex } from '../audio/audioManager';

const Lab = ( {dinoName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    setBackground(scene);

    
    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Light
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(0, 500, 0);
    topLight.castShadow = true;
    topLight.intensity = 3;
    scene.add(topLight);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const canvas = document.querySelector('.webgl');
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // Enable anti-aliasing for smoother rendering
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio); // Optimize for high DPI screens
    renderer.setClearColor('#1e1e1e');
    renderer.shadowMap.enabled = true; // Enable shadow map
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows for better visual quality
    renderer.gammaFactor = 2.2; // Standardize gamma correction
    renderer.outputEncoding = THREE.sRGBEncoding; // Correct output encoding

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 15;   // Minimum zoom distance
    controls.maxDistance = 20;

    controls.minPolarAngle = Math.PI / 2.2;    // ~60°
    controls.maxPolarAngle = Math.PI / 2;

    // Resize event listener
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    // Keep the 3D object on a global variable so we can access it later
    let object;
    let mixer; // Animation mixer

    // Instantiate a loader for the .gltf file
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();

    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audioLoader = new THREE.AudioLoader();

     // Load selected model
    loadDino(dinoName, loader, scene, listener, audioLoader)
      .then((loaded) => {
        if (!loaded) return;
        object = loaded.object;
        mixer = loaded.mixer;

        // You can now load platform here since object is ready
        // loadPlatform(scene, object, loader, 'platform');
      })
      .catch(err => console.error('Error loading dino:', err));

    // Load rex
    // loadRex(loader, scene).then(({ object: loadedObject, mixer: loadedMixer }) => {
    //   object = loadedObject;
    //   mixer = loadedMixer;
    //   initRexSounds(listener, audioLoader);
    // }).catch(error => {
    //   console.error('Failed to load Rex:', error);
    // });

    // Load raptor
    // loadRaptor(loader, scene).then(({ object: loadedObject, mixer: loadedMixer }) => {
    //   object = loadedObject;
    //   mixer = loadedMixer;
    //   initRaptorSounds(listener, audioLoader);
    // }).catch(error => {
    //   console.error('Failed to load Rex:', error);
    // });

    //Load platform
    const platformObj = 'platform';
    loadPlatform(scene, object, loader, platformObj);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      controls.update(); // Update controls if needed
      renderer.render(scene, camera);
    }

    // Perform the animation loop
    animate();

    // Mouse interaction
    let mouseDown = false;
    let rgb = [];
    window.addEventListener('mousedown', () => (mouseDown = true));
    window.addEventListener('mouseup', () => (mouseDown = false));

    window.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150,
        ];
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(object.material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
      }
    });
    
    // Play music
    const bgMusic = new THREE.Audio(listener);

    // audioLoader.load('../music/sci-fi-bgm-short.mp3', function (buffer) {
    //   bgMusic.setBuffer(buffer);
    //   bgMusic.setLoop(true);
    //   bgMusic.setVolume(0.1);
    //   bgMusic.play();
    // });

    // Play sound
    initAIRex(listener, audioLoader);
    // const roarSound = new THREE.Audio(listener);

    // audioLoader.load('../sounds/rex-sounds.mp3', function (buffer) {
    //   roarSound.setBuffer(buffer);
    //   roarSound.setLoop(true);
    //   roarSound.setVolume(0.1);
    //   roarSound.play();
    // });
    
    return () => {
        // Clean up resources
        renderer.dispose();
        controls.dispose();
        bgMusic.stop();
        roarSound.stop();
      };
    }, []); // Empty array ensures this effect runs once on mount

    if (navigator.gpu) {
      console.log('WebGPU is supported!');
    } else {
      console.log('WebGPU is not supported on this browser/device.');
    }

  return (
    <div>
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default Lab;