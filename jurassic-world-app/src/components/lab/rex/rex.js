import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

export function loadRex(loader, scene, objToRender = 'rexy') {
  return new Promise((resolve, reject) => {
    loader.load(
      `./models/${objToRender}/scene.gltf`,
      function (gltf) {
        const object = gltf.scene;
        const dimension = 5;
        object.scale.set(dimension, dimension, dimension);
        object.position.set(0, -3, 0);
        scene.add(object);

        let mixer = null;

        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(object);
          const walkAnim = 'Mesh_Trexg3 (merge)_Anim_001_Radar_BWalk';
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
        console.error('Error loading Rex model:', error);
        reject(error);
      }
    );
  });
}
