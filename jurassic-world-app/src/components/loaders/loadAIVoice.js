import { getAIRex, getAIRaptor, getAITriceratops, getAISpinosaurus, getAIIndominus } from '../audio/audioManager';

export const loadAIVoice = (dinoName) => {
    let aiSound = null;

    switch (dinoName.toLowerCase()) {
        case 'tyrannosaurus rex':
            aiSound = getAIRex();
            break;

        case 'velociraptor':
            aiSound = getAIRaptor();
            break;
            
        case 'triceratops':
            aiSound = getAITriceratops();
            break;

        case 'spinosaurus':
            aiSound = getAISpinosaurus();
            break;

        case 'indominus rex':
            aiSound = getAIIndominus();
            break;
        default:
        console.warn(`No ai voice defined for: ${dinoName}`);
        return null;
    }

    return aiSound;
};
