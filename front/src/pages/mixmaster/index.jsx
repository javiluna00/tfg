import useMixMaster from '@/hooks/useMixMaster'
import React, { useEffect } from 'react'

function Mixmaster() {

  const { tarifas, setTarifas, loadTarifas } = useMixMaster()

  useEffect(() => {
    loadTarifas()
  }, [])

  return (
    <div className='container'>
      <div className='flex flex-col justify-center items-center mt-10'>
        {tarifas.map((tarifa) => (
          <div key={tarifa.id} className='flex flex-col justify-center items-start bg-white rounded-2xl p-5'>
            <h5 className='font-semibold text-xl text-[#0f0f0f]'>{tarifa.nombre}</h5>
            <p>{tarifa.description}</p>
            <h5>{tarifa.precio}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mixmaster