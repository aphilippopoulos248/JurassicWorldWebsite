import { useState } from 'react'
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
      <h1 class="title">Tyrannosaurus Rex</h1>
      <Lab/>
    </>
  )
}

export default LabScene
