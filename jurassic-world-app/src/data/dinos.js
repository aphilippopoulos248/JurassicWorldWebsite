
import { loadRex } from '../components/lab/rex/rex';
import { initRexSounds, initRaptorSounds } from '../components/audio/audioManager';

const Dinos_Data = [
    {
        no:"01",
        name:"Tyrannosaurus Rex",
        link:"/lab",
        loadDino: loadRex,
    },
    {
        no:"02",
        name:"Velociraptor",
        link:"/lab",
    },
    {
        no:"03",
        name:"Triceratops",
        link:"/lab",
    },
]
 
export default Dinos_Data;