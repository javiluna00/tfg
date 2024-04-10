import Card from '@/components/ui/Card'
import React from 'react'

function ServicioCard({tarifa}) {
  return (
    <Card bodyClass="p-0" className={`relative overflow-hidden shadow-md scale-90 hover:scale-105 duration-300`} key={tarifa.id}>
        <div className='select-none'>
            <div className="image-box select-none">
                <img
                    src={tarifa.image}
                    alt=""
                    className="rounded-t-md w-full h-full object-cover"
                />
            </div>

            {tarifa.ribon ? 

            <div className="text-sm font-medium bg-white text-slate-900 py-2 text-center absolute ltr:-right-[43px] rtl:-left-[43px] top-6 px-10 transform ltr:rotate-[45deg] rtl:-rotate-45">
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
        </div>
    </Card>
  )
}

export default ServicioCard