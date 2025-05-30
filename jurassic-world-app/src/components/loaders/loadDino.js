import { loadRex } from '../lab/rex/rex';
import { loadRaptor } from '../lab/raptor/raptor';
import { initRexSounds, initRaptorSounds } from '../audio/audioManager';

export const loadDino = async (dinoName, loader, scene, listener, audioLoader) => {
  switch (dinoName.toLowerCase()) {
    case 'tyrannosaurus rex':
      const rex = await loadRex(loader, scene);
      initRexSounds(listener, audioLoader);
      return rex;

    case 'velociraptor':
      const raptor = await loadRaptor(loader, scene);
      initRaptorSounds(listener, audioLoader);
      return raptor;

    default:
      console.warn(`No loader defined for: ${dinoName}`);
      return null;
  }
};
