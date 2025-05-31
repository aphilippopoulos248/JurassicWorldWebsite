import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import gsap from 'gsap';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { setBackground } from '../bg/background.js';
import { loadPlatform } from './platform/platform.js';
import { loadRex } from "./dinos/rex/rex.js";
import { loadRaptor } from "./dinos/raptor/raptor.js";
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

    controls.minDistance = 10;   // Minimum zoom distance
    controls.maxDistance = 20;

    controls.minPolarAngle = Math.PI / 2.2;    // ~60°
    controls.maxPolarAngle = Math.PI / 2;

    function handleResize() {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    }

    // Resize event listener
    window.addEventListener('resize', handleResize);

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
      })
      .catch(err => console.error('Error loading dino:', err));
      
    //Load platform
    loadPlatform(scene, object, loader, 'platform');

    // Animation loop
    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      controls.update(); // Update controls if needed
      renderer.render(scene, camera);
    }

    // Perform the animation loop
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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