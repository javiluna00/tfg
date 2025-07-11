import useMixMaster from '@/hooks/useMixMaster'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import Button from '@/components/ui/Button'
import CompararMix from './components/CompararMix'
import { Link, useOutletContext } from 'react-router-dom'
import ServicioCard from './components/ServicioCard'

function Mixmaster () {
  const {AxiosPrivate} = useOutletContext()
  const { tarifas, loadTarifas } = useMixMaster({ AxiosPrivate})

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
    <div className='py-10 bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(236,23,27,0.3),rgba(255,255,255,0))]'>
      <div className='container'>

        <div id='tarifas' className='flex flex-col justify-center items-start rounded-xl p-10 min-h-screen'>
          <h3 className='text-5xl md:text-7xl font-semibold text-center w-full text-amber-50'><span className='text-red-500 text-ellipsis font-bold'>Profesionaliza</span> tu canción</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center gap-4 mt-10 w-fit mx-auto'>
            {tarifas.map((tarifa) => (
              <ServicioCard tarifa={tarifa} key={tarifa.id} />
            ))}
          </div>
          <div className='my-10 h-px w-[70%] mx-auto bg-red-500' />
          <div className='flex flex-col justify-center items-center  w-full gap-4'>
            <p className='text-xl text-amber-50'>Si necesitas alguno de estos <span className='text-red-500 font-bold'>servicios</span>, ponte en contacto conmigo</p>
            <Link to='/contact'><Button className='text-red-500 hover:text-amber-50 hover:bg-red-500 duration-300 text-xl border border-red-500 rounded-full mt-10'>¡Contáctame!</Button></Link>
          </div>
        </div>

        <div className='flex justify-center items-center my-10 p-10 rounded-xl min-h-screen'>
          <div className='w-1/2 flex flex-col gap-5'>
            <h3 className='text-8xl font-semibold text-amber-50'>Siente el <span className='text-red-500 font-bold'>cambio</span></h3>
            <p className='text-4xl text-amber-50'>Deja que <span className='text-red-500 font-bold'>transforme</span> completamente tu canción</p>
          </div>
          <div className='w-1/2'>
            <CompararMix title='Vocal example' />
            <CompararMix />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Mixmaster
