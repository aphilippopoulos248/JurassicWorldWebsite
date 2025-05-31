import { loadRex } from '../lab/dinos/rex/rex';
import { loadRaptor } from '../lab/dinos/raptor/raptor';
import { initRexSounds, initRaptorSounds } from '../audio/audioManager';

const DINO_COORDINATES = {
  'tyrannosaurus rex': [
    { lat: 49.0, lng: -107.0, name: 'Canada – Eastend, Saskatchewan (Scotty site)' },
    { lat: 45.0466, lng: -102.0325, name: 'USA – Faith, South Dakota (Sue site)' },
    { lat: 49.6075, lng: -114.1069, name: 'Canada – Crowsnest Pass, Alberta (Coulee site)' },
    { lat: 46.0, lng: -106.0, name: 'USA – Hell Creek Formation, Montana' },
    { lat: 33.0, lng: -107.0, name: 'USA – Elephant Butte Reservoir, New Mexico' },
    { lat: 36.5, lng: -104.5, name: 'USA – Raton, New Mexico' },
    { lat: 46.0, lng: -103.5, name: 'USA – Marmarth, North Dakota' },
    { lat: 45.0, lng: -106.0, name: 'USA – Charles M. Russell National Wildlife Refuge, Montana (Devil Rex)' },
  ],
  'velociraptor': [
    { lat: 43.7, lng: 103.8, name: 'Mongolia – Djadokhta Formation' },
    { lat: 42.9, lng: 104.2, name: 'China – Bayan Mandahu Formation, Inner Mongolia' },
    { lat: 41.8, lng: 100.8, name: 'China – Ejina area, Inner Mongolia (Bayan Mandahu region)' },
    { lat: 41.3, lng: 119.3, name: 'China – Yixian Formation, Liaoning Province (related dromaeosaurids)' },
    { lat: 42.0, lng: 104.0, name: 'Mongolia – Tugrig locality (Tugrugeen Shireh)' },
    { lat: 40.04, lng: 112.42, name: 'China – Bayan Mandahu Formation, Inner Mongolia (Velociraptor osmolskae)' },
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

