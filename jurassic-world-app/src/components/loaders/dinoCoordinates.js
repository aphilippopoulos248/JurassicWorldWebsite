import { loadRex } from '../lab/dinos/rex/rex';
import { loadRaptor } from '../lab/dinos/raptor/raptor';
import { initRexSounds, initRaptorSounds } from '../audio/audioManager';

const DINO_COORDINATES = {
  'tyrannosaurus rex': [
    { lat: 49.0, lng: -107.0, name: 'Eastend, Saskatchewan (Scotty site)' },
    { lat: 45.0466, lng: -102.0325, name: 'Faith, South Dakota (Sue site)' },
    { lat: 49.6075, lng: -114.1069, name: 'Crownest Pass, Alberta (Coulee site)' },
    { lat: 46.0, lng: -106.0, name: 'Hell Creek Formation' },
    { lat: 33.0, lng: -107.0, name: 'Elephant Butte Reservoir' },
    { lat: 36.5, lng: -104.5, name: 'Raton, New Mexico' },
    { lat: 46.0, lng: -103.5, name: 'Marmarth, North Dakota' },
  ],
  'velociraptor': [
    { lat: 43.7, lng: 103.8, name: 'Mongolia – Djadokhta Formation' },
  ],
  // Add more species here...
};

export const dinoCoords = async (dinoName) => {
  const key = dinoName.toLowerCase();
  if (DINO_COORDINATES[key]) {
    return DINO_COORDINATES[key];
  } else {
    console.warn(`No coordinates defined for: ${dinoName}`);
    return null;
  }
};

