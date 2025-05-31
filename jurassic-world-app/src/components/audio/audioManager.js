// audioManager.js
import * as THREE from 'three';

let rexSounds;
let raptorSounds;

let aiRexSound;
let aiRaptorSound;

let aiIntroSound;
let bgm;
let listener = null;
let audioLoader = null;

export const initAudioSystem = () => {
  if (!listener) listener = new THREE.AudioListener();
  if (!audioLoader) audioLoader = new THREE.AudioLoader();
};

export const getListener = () => listener;

// Dino sounds
export const initRexSounds = (listener, audioLoader) => {
  rexSounds = new THREE.Audio(listener);
  audioLoader.load('../sounds/rex-sounds.mp3', function (buffer) {
    rexSounds.setBuffer(buffer);
    rexSounds.setLoop(true);
    rexSounds.setVolume(0.2);
    rexSounds.play();
  });
};

export const getRexSounds = () => rexSounds;

export const initRaptorSounds = (listener, audioLoader) => {
  raptorSounds = new THREE.Audio(listener);
  audioLoader.load('../sounds/raptor-sounds.mp3', function (buffer) {
    raptorSounds.setBuffer(buffer);
    raptorSounds.setLoop(true);
    raptorSounds.setVolume(0.2);
    raptorSounds.play();
  });
};

export const getRaptorSounds = () => raptorSounds;

export const initAIRex = (listener, audioLoader) => {
  aiRexSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-rex.mp3', function (buffer) {
    aiRexSound.setBuffer(buffer);
    aiRexSound.setLoop(false);
    aiRexSound.setVolume(.5);
  });
};

// AI voice sounds
export const getAIRex = () => aiRexSound;

export const initAIRaptor = (listener, audioLoader) => {
  aiRaptorSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-raptor.mp3', function (buffer) {
    aiRaptorSound.setBuffer(buffer);
    aiRaptorSound.setLoop(false);
    aiRaptorSound.setVolume(.5);
  });
};

export const getAIRaptor = () => aiRaptorSound;

export const initAIIntro = () => {
  aiIntroSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/intro-voice.mp3', function (buffer) {
    aiIntroSound.setBuffer(buffer);
    aiIntroSound.setLoop(false);
    aiIntroSound.setVolume(.5);
    aiIntroSound.play();
  });
};

export const getAIIntro = () => aiIntroSound;

// Background Music

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

export const stopDinoSounds = () => {
    if (rexSounds?.stop) rexSounds.stop();
    if (raptorSounds?.stop) raptorSounds.stop();
}