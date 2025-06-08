import * as THREE from 'three';

export function loadIndominus(loader, scene, objToRender = 'indominus') {
    return new Promise((resolve, reject) => {
        loader.load(
            `./models/${objToRender}/scene.gltf`,
            function (gltf) {
                const object = gltf.scene;
                object.scale.set(5, 5, 5);
                object.position.set(0, -3, 0);
                scene.add(object);

                let mixer = null;
                let timeout = null;
                const ACTION1_TIMEOUT = 1.05;
                const ACTION2_TIMEOUT = 2.0;

                if (gltf.animations && gltf.animations.length) {
                    mixer = new THREE.AnimationMixer(object);

                    const anim1 = 'Mesh_Indominus (merge)_Anim_021_Raid_Victory_Idle';
                    const anim2 = 'Mesh_Indominus (merge)_Anim_021_Raid_NextRound';

                    const clip1 = THREE.AnimationClip.findByName(gltf.animations, anim1);
                    const clip2 = THREE.AnimationClip.findByName(gltf.animations, anim2);

                    if (clip1 && clip2) {
                        const action1 = mixer.clipAction(clip1);
                        const action2 = mixer.clipAction(clip2);

                        [action1, action2].forEach(action => {
                            action.setLoop(THREE.LoopOnce);
                            action.clampWhenFinished = true;
                            action.enabled = true;
                        });

                        let current = null;

                        const playAction = (action, clip, timeoutSeconds) => {
                            clearTimeout(timeout);
                            current = action;
                            current.reset().play();

                            timeout = setTimeout(() => {
                                mixer.dispatchEvent({ type: 'finished', action: current });
                            }, (clip.duration - timeoutSeconds) * 1000);
                        };

                        playAction(action1, clip1, ACTION1_TIMEOUT);

                        mixer.addEventListener('finished', () => {
                            current.stop();

                            if (current === action1) {
                                playAction(action2, clip2, ACTION2_TIMEOUT);
                            } else {
                                playAction(action1, clip1, ACTION1_TIMEOUT);
                            }
                        });
                    }
                }

                resolve({ object, mixer, animations: gltf.animations });
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.error('Error loading Indominus model:', error);
                reject(error);
            }
        );
    });
}
