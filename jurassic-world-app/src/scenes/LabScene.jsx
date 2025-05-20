import { useState, useEffect } from 'react'
import Lab from '../components/lab/Lab'

function LabScene() {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(true);
    }, []);

    return (
        <>
        <canvas class="webgl"></canvas>
        {/* <nav>
            <a href="/">Sphere</a>
            <ul>
            <li>Explore</li>
            <li>Create</li>
            </ul>
        </nav> */}
        <Lab/>
        <div className={`title-container ${expanded ? 'expand' : ''}`}>
            <h1 className="title">Tyrannosaurus Rex</h1>
        </div>
        </>
    )
}

export default LabScene
