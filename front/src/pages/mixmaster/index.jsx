import useMixMaster from '@/hooks/useMixMaster'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import Button from '@/components/ui/Button'
import CompararMix from './components/CompararMix'
import { Link } from 'react-router-dom'
import ServicioCard from './components/ServicioCard'

function Mixmaster () {
  const { tarifas, loadTarifas } = useMixMaster()

  useEffect(() => {
    loadTarifas()

    const waveElement = document.getElementById('wave')

    // Creamos una instancia de gsap.timeline para gestionar las animaciones
    const timeline = gsap.timeline({ repeat: -1 })

    // Animación para aumentar y disminuir la altura del rectángulo
    const waveAnimation = gsap.to(waveElement, {
      duration: 1, // Duración de la animación
      height: 50, // Ajusta la altura según tus necesidades
      yoyo: true, // Hace que la animación se invierta automáticamente
      repeat: -1, // Repetir infinitamente
      ease: 'power1.inOut' // Efecto de aceleración
    })

    // Agregamos la animación a la línea de tiempo
    timeline.add(waveAnimation)

    // Limpieza al desmontar el componente
    return () => {
      timeline.kill() // Detiene y elimina la animación al desmontar el componente
    }
  }, [])

  return (
    <div className='bg-zinc-700 py-10'>
      <div className='container'>

        <div id='tarifas' className='flex flex-col justify-center items-start bg-white rounded-xl p-10'>
          <h3 className='text-3xl font-semibold text-center w-full'>¡Profesionaliza tu canción y saca un buen sonido!</h3>
          <div className='xl:flex xl:flex-row xl:justify-center xl:items-center flex flex-col justify-center items-center w-full gap-4 mt-10'>
            {tarifas.map((tarifa) => (

              <ServicioCard tarifa={tarifa} key={tarifa.id} />

            ))}
          </div>
          <div className='my-10 h-px w-[70%] mx-auto bg-red-500' />
          <div className='flex flex-col justify-center items-center  w-full gap-4'>
            <p className='text-xl'>Si necesitas alguno de estos <span className='text-red-500 font-bold'>servicios</span>, ponte en contacto conmigo</p>
            <Link to='/contact'><Button className='text-white hover:text-white duration-300 text-xl bg-red-500 rounded-full'>¡Contáctame!</Button></Link>
          </div>
        </div>

        <div className='flex flex-col justify-center items-start my-10 bg-white p-10 rounded-xl'>
          <h3 className='text-3xl font-semibold '>¡Escucha el cambio!</h3>
          <CompararMix title='Vocal example' />
          <CompararMix />
        </div>
      </div>
    </div>

  )
}

export default Mixmaster
