import { loadRex } from '../lab/dinos/rex/rex';
import { loadRaptor } from '../lab/dinos/raptor/raptor';
import { loadTriceratops } from '../lab/dinos/triceratops/triceratops';
import { initRexSounds, initAIRex, initRaptorSounds, initAIRaptor, initTriceratopsSounds } from '../audio/audioManager';

export const loadDino = async (dinoName, loader, scene, listener, audioLoader) => {
  switch (dinoName.toLowerCase()) {
    case 'tyrannosaurus rex':
        const rex = await loadRex(loader, scene);
        initRexSounds(listener, audioLoader);
        initAIRex(listener, audioLoader);
        return rex;

    case 'velociraptor':
        const raptor = await loadRaptor(loader, scene);
        initRaptorSounds(listener, audioLoader);
        initAIRaptor(listener, audioLoader);
        return raptor;

    case 'triceratops':
        const triceratops = await loadTriceratops(loader, scene);
        initTriceratopsSounds(listener, audioLoader);
        initAIRaptor(listener, audioLoader);
        return triceratops;

    default:
      console.warn(`No loader defined for: ${dinoName}`);
      return null;
  }
};
