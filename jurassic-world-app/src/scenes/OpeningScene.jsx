import { useEffect } from 'react'
import JW from '../components/jw/JW'
import './OpeningScene.scss'
import gsap from 'gsap'

const OpeningScene = () => {
    useEffect(() => {
    // Timeline for animations
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.title-container', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 0.5, delay: 0, ease: 'power1.out' });
        tl.fromTo('.click-here', { opacity: 0 }, { opacity: 1, duration: 5, delay: 5 });
    }, [])

  return (
    <div>
        <JW/>
        <button className="click-here">
          Click Here
        </button>
    </div>
  )
}

export default OpeningScene
