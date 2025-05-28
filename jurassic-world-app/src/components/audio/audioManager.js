// audioManager.js
import * as THREE from 'three';

let roarSound;
let aiSound;

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

export const initAISound = (listener, audioLoader) => {
  aiSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-rex.mp3', function (buffer) {
    aiSound.setBuffer(buffer);
    aiSound.setLoop(false);
    aiSound.setVolume(.5);
  });
};

export const getAISound = () => aiSound;