import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import gsap from 'gsap';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { setBackground } from '../bg/background.js';
import { useEffect, useRef } from 'react'

const JW = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Keep the 3D object on a global variable so we can access it later
    let object;
    let mixer; // Animation mixer

    // Instantiate a loader for the .gltf file
    const loader = new GLTFLoader();
    const objToRender = 'jw_logo';
    const clock = new THREE.Clock();

    // Load rexy
    loader.load(
      `./models/${objToRender}/scene.gltf`,
      function (gltf) {
        object = gltf.scene;
        const dimension = .03;
        object.scale.set(dimension, dimension, dimension);
        object.position.set(0, -5, 0);
        scene.add(object);
        console.log(gltf.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.error(error);
      }
    );

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };


    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight.target);
    scene.add(directionalLight);

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
    // controls.enablePan = false;
    // controls.enableZoom = false;
    // controls.autoRotate = false;
    // controls.autoRotateSpeed = 2;

    // controls.minPolarAngle = Math.PI / 2.2;    // ~60°
    // controls.maxPolarAngle = Math.PI / 2;

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

    audioLoader.load('../music/jurassic-world-bgm.mp3', function (buffer) {
      bgMusic.setBuffer(buffer);
      bgMusic.setLoop(true);
      bgMusic.setVolume(1);

      // Play music after a user interaction
      const startAudio = () => {
        const audioContext = listener.context;
        
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            bgMusic.play();
          });
        } else {
          bgMusic.play();
        }

        // Only need to run once
        window.removeEventListener('click', startAudio);
      };

      // Play music when clicked
      window.addEventListener('click', startAudio);
    });
    
    return () => {
        // Clean up resources
        renderer.dispose();
        controls.dispose();
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

export default JW;