// audioManager.js
import * as THREE from 'three';

let roarSound;
let aiSound;
let bgm;
let listener = null;
let audioLoader = null;

export const initAudioSystem = () => {
  if (!listener) listener = new THREE.AudioListener();
  if (!audioLoader) audioLoader = new THREE.AudioLoader();
};

export const getListener = () => listener;

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

export const initBGM = () => {
  bgm = new THREE.Audio(listener);
  audioLoader.load('../music/sci-fi-bgm-short.mp3', function (buffer) {
    bgm.setBuffer(buffer);
    bgm.setLoop(true);
    bgm.setVolume(0.15);
    bgm.play();
  });
};

export const getBGM = () => bgm;