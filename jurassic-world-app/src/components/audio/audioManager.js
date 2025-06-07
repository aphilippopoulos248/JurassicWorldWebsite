// audioManager.js
import * as THREE from 'three';

let rexSounds;
let raptorSounds;
let triceratopsSounds;
let spinosaurusSounds;

let aiRexSound;
let aiRaptorSound;
let aiTriceratopsSound;
let aiSpinosaurusSound;

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
export const initRaptorSounds = (listener, audioLoader) => {
  raptorSounds = new THREE.Audio(listener);
  audioLoader.load('../sounds/raptor-sounds.mp3', function (buffer) {
    raptorSounds.setBuffer(buffer);
    raptorSounds.setLoop(true);
    raptorSounds.setVolume(0.2);
    raptorSounds.play();
  });
};
export const initTriceratopsSounds = (listener, audioLoader) => {
  triceratopsSounds = new THREE.Audio(listener);
  audioLoader.load('../sounds/triceratops-sounds.mp3', function (buffer) {
    triceratopsSounds.setBuffer(buffer);
    triceratopsSounds.setLoop(true);
    triceratopsSounds.setVolume(0.2);
    triceratopsSounds.play();
  });
};
export const initSpinosaurusSounds = (listener, audioLoader) => {
  spinosaurusSounds = new THREE.Audio(listener);
  audioLoader.load('../sounds/spino-sounds.mp3', function (buffer) {
    spinosaurusSounds.setBuffer(buffer);
    spinosaurusSounds.setLoop(true);
    spinosaurusSounds.setVolume(0.3);
    spinosaurusSounds.play();
  });
};

export const getRexSounds = () => rexSounds;
export const getRaptorSounds = () => raptorSounds;
export const getTriceratopsSounds = () => triceratopsSounds;
export const getSpinosaurusSounds = () => spinosaurusSounds;

// AI voice sounds
export const initAIIntro = () => {
  aiIntroSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/intro-voice.mp3', function (buffer) {
    aiIntroSound.setBuffer(buffer);
    aiIntroSound.setLoop(false);
    aiIntroSound.setVolume(.5);
    aiIntroSound.play();
  });
};
export const initAIRex = (listener, audioLoader) => {
  aiRexSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-rex.mp3', function (buffer) {
    aiRexSound.setBuffer(buffer);
    aiRexSound.setLoop(false);
    aiRexSound.setVolume(.5);
  });
};
export const initAIRaptor = (listener, audioLoader) => {
  aiRaptorSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-raptor.mp3', function (buffer) {
    aiRaptorSound.setBuffer(buffer);
    aiRaptorSound.setLoop(false);
    aiRaptorSound.setVolume(.5);
  });
};
export const initAITriceratops = (listener, audioLoader) => {
  aiTriceratopsSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-triceratops.mp3', function (buffer) {
    aiTriceratopsSound.setBuffer(buffer);
    aiTriceratopsSound.setLoop(false);
    aiTriceratopsSound.setVolume(.5);
  });
};
export const initAISpinosaurus = (listener, audioLoader) => {
  aiSpinosaurusSound = new THREE.Audio(listener);
  audioLoader.load('../sounds/ai-voice-spino.mp3', function (buffer) {
    aiSpinosaurusSound.setBuffer(buffer);
    aiSpinosaurusSound.setLoop(false);
    aiSpinosaurusSound.setVolume(.5);
  });
};

export const getAIIntro = () => aiIntroSound;
export const getAIRex = () => aiRexSound;
export const getAIRaptor = () => aiRaptorSound;
export const getAITriceratops = () => aiTriceratopsSound;
export const getAISpinosaurus = () => aiSpinosaurusSound;

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

export const getActiveDinoSound = () => {
  if (rexSounds?.isPlaying) return rexSounds;
  if (raptorSounds?.isPlaying) return raptorSounds;
  if (triceratopsSounds?.isPlaying) return triceratopsSounds;
  if (spinosaurusSounds?.isPlaying) return spinosaurusSounds;
  return null;
};

export const stopDinoSounds = () => {
    if (rexSounds?.stop) rexSounds.stop();
    if (raptorSounds?.stop) raptorSounds.stop();
    if (triceratopsSounds?.stop) triceratopsSounds.stop();
    if (spinosaurusSounds?.stop) spinosaurusSounds.stop();
}

export const stopAISounds = () => {
    if (aiRexSound?.stop) aiRexSound.stop();
    if (aiRaptorSound?.stop) aiRaptorSound.stop();
    if (aiTriceratopsSound?.stop) aiTriceratopsSound.stop();
    if (aiSpinosaurusSound?.stop) aiSpinosaurusSound.stop();
}
