import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'

import '@/pages/home/index.css'

import background from '@/assets/images/home/background.png'
import thunder1 from '@/assets/images/home/thunder1bien.png'
import thunder2 from '@/assets/images/home/thunder2bien.png'
import thunder3 from '@/assets/images/home/thunder3bien.png'
import thunder4 from '@/assets/images/home/thunder4bien.png'

import logolambda from '@/assets/videos/home/logolambda.mp4'
import ReactPlayer from 'react-player'

function Bienvenida () {
  const elementRef1 = useRef(null)
  const elementRef2 = useRef(null)
  const elementRef3 = useRef(null)
  const elementRef4 = useRef(null)

  const [hoveredElement, setHoveredElement] = useState(null)

  useEffect(() => {
    navigate('/')
  }, [])

  const playerRef = useRef(null)
  const playerRefClone = useRef(null)

  const navigate = useNavigate()

  const handleVideoEnd = () => {
    const player = playerRef.current

    if (player) {
      player.currentTime = 0.1
      player.play()
    }
  }

  const handleMouseMove1 = (event) => {
    const { clientX, clientY } = event
    const element1 = elementRef1.current

    if (element1) {
      setHoveredElement('element1')

      const { left, top, width, height } = element1.getBoundingClientRect()

      // Calcular la posición relativa del ratón en relación con el elemento
      const mouseX = clientX - left
      const mouseY = clientY - top

      // Realizar acciones basadas en la posición del ratón
      // Por ejemplo, aplicar una animación de escala al texto y al div
      gsap.to(element1, {
        opacity: 1,

        filter: 'grayscale(0%)',
        transformOrigin: '100% 100%',
        duration: 0.5
      })
    }
  }

  const handleMouseMove2 = (event) => {
    setHoveredElement('element2')

    const { clientX, clientY } = event
    const element2 = elementRef2.current
    if (element2) {
      const { left, top, width, height } = element2.getBoundingClientRect()

      // Calcular la posición relativa del ratón en relación con el elemento
      const mouseX = clientX - left
      const mouseY = clientY - top

      // Realizar acciones basadas en la posición del ratón
      // Por ejemplo, aplicar una animación de escala al texto y al div
      gsap.to(element2, {
        opacity: 1,

        filter: 'grayscale(0%)',
        transformOrigin: '0% 100%',
        duration: 0.5
      })
    }
  }

  const handleMouseMove3 = (event) => {
    setHoveredElement('element3')

    const { clientX, clientY } = event
    const element3 = elementRef3.current
    if (element3) {
      const { left, top, width, height } = element3.getBoundingClientRect()

      // Calcular la posición relativa del ratón en relación con el elemento
      const mouseX = clientX - left
      const mouseY = clientY - top

      // Realizar acciones basadas en la posición del ratón
      // Por ejemplo, aplicar una animación de escala al texto y al div
      gsap.to(element3, {
        opacity: 1,

        filter: 'grayscale(0%)',
        transformOrigin: '100% 0%',
        duration: 0.5
      })
    }
  }

  const handleMouseMove4 = (event) => {
    setHoveredElement('element4')

    const { clientX, clientY } = event
    const element4 = elementRef4.current
    if (element4) {
      const { left, top, width, height } = element4.getBoundingClientRect()

      // Calcular la posición relativa del ratón en relación con el elemento
      const mouseX = clientX - left
      const mouseY = clientY - top

      // Realizar acciones basadas en la posición del ratón
      // Por ejemplo, aplicar una animación de escala al texto y al div
      gsap.to(element4, {
        opacity: 1,

        filter: 'grayscale(0%)',
        transformOrigin: '0% 0%',
        duration: 0.5
      })
    }
  }

  const handleMouseLeave1 = () => {
    const element1 = elementRef1.current

    if (element1) {
      gsap.to(element1, {
        opacity: 0,
        filter: 'grayscale(100%)',

        duration: 0.5
      })
    }
  }

  const handleMouseLeave2 = () => {
    const element2 = elementRef2.current
    if (element2) {
      gsap.to(element2, {
        opacity: 0,
        filter: 'grayscale(100%)',

        duration: 0.5
      })
    }
  }

  const handleMouseLeave3 = () => {
    const element3 = elementRef3.current
    if (element3) {
      gsap.to(element3, {
        opacity: 0,
        filter: 'grayscale(100%)',

        duration: 0.5
      })
    }
  }

  const handleMouseLeave4 = () => {
    const element4 = elementRef4.current
    if (element4) {
      gsap.to(element4, {
        opacity: 0,
        filter: 'grayscale(100%)',

        duration: 0.5
      })
    }
  }
  return (

    <div className='relative overflow-hidden'>

      <div className='grid w-full h-screen grid-cols-2 grid-rows-2 bg-[#000000] overflow-hidden bg-cover'>

        <div
          className='text-white flex justify-center items-center'
          onMouseMove={handleMouseMove1}
          onMouseLeave={handleMouseLeave1}
        >

          <div className='w-full h-full'>
            <img className='w-full h-full grayscale opacity-0 scale-150' ref={elementRef1} src={thunder3} alt='Rayo' />
          </div>

          <span className='z-10 absolute' onClick={(e) => navigate('/')}>Beats</span>
        </div>

        <div
          className='text-white flex justify-center items-center'
          onMouseMove={handleMouseMove2}
          onMouseLeave={handleMouseLeave2}
        >
          <div className='image-container w-full h-full'>
            <img className='w-full h-full grayscale opacity-0 scale-150' ref={elementRef2} src={thunder4} alt='Rayo' />
          </div>

          <span className='z-10 absolute text-vertical' style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>Proyectos</span>
        </div>

        <div
          className='text-white flex justify-center items-center'
          onMouseMove={handleMouseMove3}
          onMouseLeave={handleMouseLeave3}
        >
          <div className='image-container w-full h-full'>
            <img className='w-full h-full grayscale opacity-0 scale-150' ref={elementRef3} src={thunder2} alt='Rayo' />
          </div>

          <span className='z-10 absolute'>Mezcla y master</span>
        </div>

        <div
          className='text-white flex justify-center items-center'
          onMouseMove={handleMouseMove4}
          onMouseLeave={handleMouseLeave4}
        >
          <div className='image-container w-full h-full'>
            <img className='w-full h-full grayscale opacity-0 scale-150' ref={elementRef4} src={thunder1} alt='Rayo' />
          </div>

          <span className='z-10 absolute'>Contacto</span>
        </div>

      </div>

      <div className='video-container absolute inset-0 w-96 h-96 m-auto'>
        <video className='w-full h-full object-cover mix-blend-screen' autoPlay muted ref={playerRef} src={logolambda} onEnded={handleVideoEnd} />
      </div>

    </div>

  )
};

export default Bienvenida
