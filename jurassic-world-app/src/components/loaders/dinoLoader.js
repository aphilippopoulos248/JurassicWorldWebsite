import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';
import * as THREE from 'three';

// Rex Loader
export const loadRex = (loader, scene) => {
    return new Promise((resolve, reject) => {
        loader.load('/models/rex.glb', (gltf) => {
            const object = gltf.scene;
            const mixer = new AnimationMixer(object);
            object.scale.set(1, 1, 1);
            scene.add(object);
            resolve({ object, mixer });
        }, undefined, reject);
    });
};

// Raptor Loader
export const loadRaptor = (loader, scene) => {
    return new Promise((resolve, reject) => {
        loader.load('/models/raptor.glb', (gltf) => {
            const object = gltf.scene;
            const mixer = new AnimationMixer(object);
            object.scale.set(1, 1, 1);
            scene.add(object);
            resolve({ object, mixer });
        }, undefined, reject);
    });
};
