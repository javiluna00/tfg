import useMixMaster from '@/hooks/useMixMaster'
import React, { useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import Button from '@/components/ui/Button'
import CompararMix from './components/CompararMix'
import { Link } from 'react-router-dom'

function Mixmaster() {

  const { tarifas, setTarifas, loadTarifas } = useMixMaster()

  useEffect(() => {
    loadTarifas()
  
    const waveElement = document.getElementById('wave');
  
    // Creamos una instancia de gsap.timeline para gestionar las animaciones
    const timeline = gsap.timeline({ repeat: -1 });
  
    // Animación para aumentar y disminuir la altura del rectángulo
    const waveAnimation = gsap.to(waveElement, {
      duration: 1, // Duración de la animación
      height: 50, // Ajusta la altura según tus necesidades
      yoyo: true, // Hace que la animación se invierta automáticamente
      repeat: -1, // Repetir infinitamente
      ease: 'power1.inOut', // Efecto de aceleración
    });
  
    // Agregamos la animación a la línea de tiempo
    timeline.add(waveAnimation);
  
    // Limpieza al desmontar el componente
    return () => {
      timeline.kill(); // Detiene y elimina la animación al desmontar el componente
    };
  }, [])



  return (
    <div className='container'>

      <div id='tarifas' className='flex flex-col justify-center items-start my-10 bg-white p-10 rounded-xl'>
        <h3 className='text-3xl font-semibold'>¡Profesionaliza tu canción y saca un buen sonido!</h3>
        <div className='flex justify-start items-start gap-4 mt-10'>
          {tarifas.map((tarifa) => (
            <Card bodyClass="p-0" className={`relative overflow-hidden shadow-md`} key={tarifa.id}>
              <div className="image-box ">
                <img
                  src={tarifa.image}
                  alt=""
                  className="rounded-t-md w-full h-full object-cover"
                />
              </div>

              {tarifa.ribon ?                 
                <div className="text-sm font-medium bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-300 py-2 text-center absolute ltr:-right-[43px] rtl:-left-[43px] top-6 px-10 transform ltr:rotate-[45deg] rtl:-rotate-45">
                  {tarifa.ribon}
                </div>
                :
                <></>
              }

              <div className={`p-6 ${tarifa.destacado ? 'bg-red-500 text-white' : ''} rounded-b-lg`}>
                <div className={`card-title mb-5 ${tarifa.destacado ? 'text-white' : ''}`}>{tarifa.nombre}</div>
                <div className="text-sm">
                  {tarifa.description}
                </div>
                <div className={`text-xl mt-5 font-bold ${tarifa.destacado ? 'text-white' : 'text-red-500'}`}>
                  {tarifa.precio}
                </div>
              </div>
            </Card>
            
          ))}
        </div>
        <div className='my-10 h-px w-[70%] mx-auto bg-red-500'/>
        <div className='flex flex-col justify-center items-center  w-full gap-4'>
            <p className='text-xl'>Si necesitas alguno de estos <span className='text-red-500 font-bold'>servicios</span>, ponte en contacto conmigo</p>
            <Link to="/contacto"><Button className='text-white hover:text-white duration-300 text-xl bg-red-500 rounded-full'>¡Contacto!</Button></Link>
        </div>
      </div>
      

      <div className='flex flex-col justify-center items-start my-10 bg-white p-10 rounded-xl'>
          <h3 className='text-3xl font-semibold '>¡Escucha el cambio!</h3>
          <CompararMix/>
          <CompararMix/>
      </div>
    </div>
  )
}

export default Mixmaster