import * as THREE from 'three';

/**
 * Set a background to the scene
 * @param {THREE.Scene} scene
 */
export function setBackground(scene) {
  // Option 1: Solid color background
  // scene.background = new THREE.Color('#1e1e1e');
const geometry = new THREE.BoxGeometry(100, 100, 100);
const texture = new THREE.TextureLoader().load('/skybox/lab-wall.jpg');
const materials = Array(6).fill().map(() => new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide
}));

const skybox = new THREE.Mesh(geometry, materials);
scene.add(skybox);

// Move the skybox upward
skybox.position.y = 10;
const skyboxDimension = 0.8;
skybox.scale.set(skyboxDimension, skyboxDimension, skyboxDimension);


  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: '#ffffff',
    sizeAttenuation: true,
    transparent: true,
    alphaTest: 0.1,
    opacity: 0.8,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Mouse interaction
  // document.addEventListener('mousemove', (event) => {
  //   const x = (event.clientX / window.innerWidth) * 2 - 1;
  //   const y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   // Example: rotate based on mouse
  //   particles.rotation.y = x * 0.5;
  //   particles.rotation.x = y * 0.5;
  // });

}
