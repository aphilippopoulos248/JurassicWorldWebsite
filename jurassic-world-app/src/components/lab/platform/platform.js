import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

export function loadPlatform(scene, object, loader, objToRender) {
    //Load the file
    loader.load(
    `./models/${objToRender}/scene.gltf`,
    function (gltf) {
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        const dimension = 1.5;
        object.scale.set(dimension, dimension, dimension);
        object.position.set(0, -3, 0);
        scene.add(object);

        // Check if there are any animations
        if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(object);

        // Play all animations (you can be selective here if needed)
        // gltf.animations.forEach((clip) => {
        //   mixer.clipAction(clip).play();
        // });

        // Playing walk animation
        const clip = THREE.AnimationClip.findByName(gltf.animations, 'Mesh_Trexg3 (merge)_Anim_001_Radar_BWalk');
        if (clip) {
            mixer.clipAction(clip).play();
        }
        console.log(gltf.animations)
        }
    },
    function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error(error);
    }
    );

    // const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    // topLight.position.set(500, 500, 500) //top-left-ish
    // topLight.castShadow = false;
    // topLight.intensity = 5;
    // scene.add(topLight);

    // Ambient light to uniformly light up the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // (color, intensity)
scene.add(ambientLight);

}