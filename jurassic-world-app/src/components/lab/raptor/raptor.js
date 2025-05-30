import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

export function loadRaptor(loader, scene, objToRender = 'raptor') {
  return new Promise((resolve, reject) => {
    loader.load(
      `./models/${objToRender}/scene.gltf`,
      function (gltf) {
        const object = gltf.scene;
        const dimension = 2.5;
        object.scale.set(dimension, dimension, dimension);
        object.position.set(0, -3, 0);
        scene.add(object);

        let mixer = null;

        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(object);
          const walkAnim = 'bark';
          const clip = THREE.AnimationClip.findByName(gltf.animations, walkAnim);
          if (clip) {
            const action = mixer.clipAction(clip);
            action.play();
          }
        }

        resolve({ object, mixer, animations: gltf.animations });
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.error('Error loading Raptor model:', error);
        reject(error);
      }
    );
  });
}
