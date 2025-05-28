// audioManager.js
import * as THREE from 'three';

let roarSound;

export const initRoarSound = (listener, audioLoader) => {
  roarSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/rex-sounds.mp3', function (buffer) {
    roarSound.setBuffer(buffer);
    roarSound.setLoop(true);
    roarSound.setVolume(0.1);
    roarSound.play();
  });
};

export const getRoarSound = () => roarSound;
