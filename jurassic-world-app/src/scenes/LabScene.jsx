import { useState, useEffect } from 'react'
import Lab from '../components/lab/Lab'

function LabScene() {
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
        <div className="ui-container">
            <div className={'title-container'}>
                <h1 className="title">Tyrannosaurus Rex</h1>
            </div> 
        </div>
        </>
    )
}

export default LabScene
