import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import gsap from 'gsap';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { setBackground } from '../bg/background.js';
import { loadPlatform } from './platform/platform.js';
import { useEffect, useRef } from 'react'
import { initRoarSound, initAIRex } from '../audio/audioManager';

const Lab = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    setBackground(scene);

    // Keep the 3D object on a global variable so we can access it later
    let object;
    let mixer; // Animation mixer

    // Instantiate a loader for the .gltf file
    const loader = new GLTFLoader();
    const objToRender = 'rexy';
    const clock = new THREE.Clock();

    // Load rexy
    loader.load(
      `./models/${objToRender}/scene.gltf`,
      function (gltf) {
        object = gltf.scene;
        const dimension = 5;
        object.scale.set(dimension, dimension, dimension);
        object.position.set(0, -3, 0);
        scene.add(object);

        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(object);
          const walkAnim = 'Mesh_Trexg3 (merge)_Anim_001_Radar_BWalk';
          const idleAnim = 'Mesh_Trexg3 (merge)_Anim_001_Raid_Victory_Idle';
          const clip = THREE.AnimationClip.findByName(gltf.animations, walkAnim);
          if (clip) {
            // clip.duration /= 5.15;
            const action = mixer.clipAction(clip);
            action.play();
            // action.setLoop(THREE.LoopRepeat, Infinity);
            
          }
          console.log(gltf.animations);
        }
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.error(error);
      }
    );

    //Load platform
    const platformObj = 'platform';
    loadPlatform(scene, object, loader, platformObj);

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
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const bgMusic = new THREE.Audio(listener);

    // audioLoader.load('../music/sci-fi-bgm-short.mp3', function (buffer) {
    //   bgMusic.setBuffer(buffer);
    //   bgMusic.setLoop(true);
    //   bgMusic.setVolume(0.1);
    //   bgMusic.play();
    // });

    // Play sound
    initRoarSound(listener, audioLoader);
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