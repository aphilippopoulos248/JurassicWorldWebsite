import { useEffect } from 'react'
import JW from '../../components/jw/JW'
import './OpeningScene.scss'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

const OpeningScene = () => {
    const navigate = useNavigate();

    const navToPage = () => {
      navigate('/menu');
    }

    useEffect(() => {
      // Timeline for animations
      const showClickHere = () => {
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.fromTo('.enter', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center', duration: 1, delay: 10, ease: 'power1.out' });
        tl.fromTo('.enter p', { opacity: 0 }, { opacity: 0.8, duration: 5, delay: 0.5 });

        window.removeEventListener('click', showClickHere);
      }

      // Show button when clicked
      window.addEventListener('click', showClickHere);
    }, [])

  return (
    <div>
        <JW/>
        <button className="enter" onClick={navToPage}>
          <p>Enter</p>
        </button>
    </div>
  )
}

export default OpeningScene
