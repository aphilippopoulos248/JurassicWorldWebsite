import * as THREE from 'three';

export function loadSpinosaurus(loader, scene, objToRender = 'spinosaurus') {
    return new Promise((resolve, reject) => {
        loader.load(
        `./models/${objToRender}/scene.gltf`,
        function (gltf) {
            const object = gltf.scene;
            const dimension = 1;
            object.scale.set(dimension, dimension, dimension);
            object.position.set(0, -3, 0);
            scene.add(object);

            let mixer = null;

            if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(object);
            const walkAnim = 'GLTF_created_0';
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
            console.error('Error loading Spinosaurus model:', error);
            reject(error);
        }
        );
    });
}
