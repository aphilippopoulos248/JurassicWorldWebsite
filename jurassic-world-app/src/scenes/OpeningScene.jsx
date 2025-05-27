import { useEffect } from 'react'
import JW from '../components/jw/JW'
import './OpeningScene.scss'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

const OpeningScene = () => {
    const navigate = useNavigate();

    const navToPage = () => {
      navigate('/lab');
    }

    useEffect(() => {
      // Timeline for animations
      const showClickHere = () => {
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.title-container', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 0.5, delay: 0, ease: 'power1.out' });
        tl.fromTo('.click-here', { opacity: 0 }, { opacity: 0.8, duration: 5, delay: 5 });

        window.removeEventListener('click', showClickHere);
      }

      // Show button when clicked
      window.addEventListener('click', showClickHere);
    }, [])

  return (
    <div>
        <JW/>
        <button className="click-here" onClick={navToPage}>
          Click Here
        </button>
    </div>
  )
}

export default OpeningScene
