import { loadRex } from '../lab/dinos/rex/rex';
import { loadRaptor } from '../lab/dinos/raptor/raptor';
import { initRexSounds, getAIRex, initRaptorSounds, getAIRaptor } from '../audio/audioManager';

export const loadAIVoice = (dinoName) => {
    let aiSound = null;

    switch (dinoName.toLowerCase()) {
        case 'tyrannosaurus rex':
            aiSound = getAIRex();
            break;

        case 'velociraptor':
            aiSound = getAIRaptor();
            break;

        default:
        console.warn(`No ai voice defined for: ${dinoName}`);
        return null;
    }

    return aiSound;
};
