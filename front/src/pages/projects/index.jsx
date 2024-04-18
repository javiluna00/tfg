import React, { useEffect, useRef } from 'react'
import logolambda from '@/assets/videos/home/logolambda.mp4'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useProjects from '@/hooks/useProjects'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProjectList from './components/ProjectList'
import useWidth from '@/hooks/useWidth'
import ProjectListMobile from './components/ProjectListMobile'

function Projects () {
  gsap.registerPlugin(ScrollTrigger)

  const { AxiosPrivate } = useOutletContext()
  const { activeProjects, getActiveProjects } = useProjects({ AxiosPrivate })
  const playerRef = useRef(null)

  useEffect(() => {
    getActiveProjects()
  }, [])

  const navigate = useNavigate()
  const { width, breakpoints } = useWidth()

  // GSAP

  const contenedorlambda = useRef()
  const videolambda = useRef()
  const fotoRef = useRef()
  const fotosRef = useRef()
  const totalRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contenedorlambda.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false
      }
    })
    tl.from(videolambda.current, {
      opacity: 0
    })
    tl.to(videolambda.current, {
      opacity: 1
    }) // <-- automatically reverted
  }, { scope: contenedorlambda }) // <-- scope is for selector text (optional)

  useEffect(() => {
    gsap.set('.derecha-item', {
      clipPath: function () {
        return 'inset(0px 0px 0px 0px)'
      }
    })

    const animation = gsap.to('.derecha-item:not(:last-child)', {
      clipPath: function () { return 'inset(0px 0px 100% 0px)' },
      stagger: 0.5,
      ease: 'none'
    })

    ScrollTrigger.create({
      animation,
      trigger: '.total',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      markers: false
    })
  }, [activeProjects, fotosRef, totalRef, playerRef, width])

  const handleVideoEnd = () => {
    const player = playerRef.current

    if (player) {
      player.currentTime = 0.1
      player.play()
    }
  }

  return (
    <>
      <div className='container'>
        <div className='flex justify-center items-center mt-10'>
          <h1 className=' text-white font-laira text-10xl tracking-widest '>Lambda Beats</h1>

        </div>
        <div className='w-full h-[300px]' />
        <div className='h-[500px] flex justify-center items-center' ref={contenedorlambda}>

          <div className='video-container absolute w-96 h-96 m-auto' style={{ background: 'black' }} ref={videolambda}>
            <video className='w-full h-full object-cover mix-blend-screen' autoPlay muted ref={playerRef} src={logolambda} onEnded={handleVideoEnd} />
          </div>

        </div>

      </div>
      <div className='spacer h-[50vh]' style={{ backgroundImage: 'linear-gradient(180deg, #000000 0%, #f87171 100%)' }} />
      {width > breakpoints.md
        ? <div className='wrapper relative h-auto w-[100vw] z-1 py-20'><ProjectList activeProjects={activeProjects} totalRef={totalRef} fotosRef={fotosRef} fotoRef={fotosRef} /></div>
        : <div className='wrapper relative h-auto w-[100vw] z-1'><ProjectListMobile activeProjects={activeProjects} totalRef={totalRef} fotosRef={fotosRef} fotosRef={fotosRef} /></div>}

      <div className='spacer h-[50vh]' style={{ backgroundImage: 'linear-gradient(180deg, #fbbf24 0%, #000000 100%)' }} />

    </>
  )
}

export default Projects
