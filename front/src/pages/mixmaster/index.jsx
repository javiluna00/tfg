import useMixMaster from '@/hooks/useMixMaster'
import React, { useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Icon } from '@iconify/react'
import gsap from 'gsap'

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

      <div id='tarifas' className='flex flex-col justify-center items-start my-10'>
        <h3 className='text-3xl font-semibold text-white'>Tarifas</h3>
        <div className='flex justify-start items-start gap-10 mt-10'>
          {tarifas.map((tarifa) => (
            <Card bodyClass="p-0" className="" key={tarifa.id}>
              <div className="image-box ">
                <img
                  src={tarifa.image}
                  alt=""
                  className="rounded-t-md w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white rounded-b-lg">
                <div className="card-title mb-5">{tarifa.nombre}</div>
                <div className="text-sm">
                  {tarifa.description}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      

      <div className='flex flex-col justify-center items-start mt-10'>
          <h3 className='text-3xl font-semibold mt-10 text-white'>¡Escucha el cambio!</h3>
          <div className='flex justify-start items-start gap-10 mt-10 bg-white w-[70%] rounded-full m-auto h-24'>
              <div className='flex justify-center items-center cursor-pointer rounded-full w-24 h-24 bg-red-500'><Icon icon="ic:baseline-play-arrow"  className='text-white text-5xl'/></div>
              <div className='onda-audio'>
                <svg>  
                  <g>    
                    <line id="line" x1="0" x2="100%" />
                    <polyline id="wave" />
                  </g>  
                </svg>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Mixmaster