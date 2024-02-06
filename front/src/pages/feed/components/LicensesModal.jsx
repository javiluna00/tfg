import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal';

import licenciaexclusiva from "@/assets/images/licencias/licenciaexclusiva.jpg";
import licencia from "@/assets/images/licencias/licencia.jpg";
import Button from '@/components/ui/Button';
import { useSetRecoilState } from 'recoil';
import { useCartActions } from '@/hooks/useCartActions';




function LicensesModal({activeModal, setActiveModal, beat}) {

  const [licencias, setLicencias] = useState([])
  const [selectedLicencia, setSelectedLicencia] = useState(null)


  const { addToCart } = useCartActions();

  const hdlCarritoButton = () => {

    if (selectedLicencia) {
      const licenciaSeleccionada = licencias.find(licencia => licencia.id === selectedLicencia);
      if (licenciaSeleccionada) {
        const itemToAdd = {
          id: beat.id, // Asegúrate de que beat tenga un id único
          name: beat.name,
          licencia: licenciaSeleccionada.nombre,
          price: parseFloat(licenciaSeleccionada.precio), // Convierte el precio a número
          descripcion: licenciaSeleccionada.descripcion,
          image: beat.image
        };
        addToCart(itemToAdd); // Añade el item al carrito
      }
    }

  }

  //OBTENER LICENCIAS PARA EL BEAT EN ESPECÍFICO
  const getLicencias = async () => {
    let licenses = [
      {id: 1, nombre: "MP3", descripcion : "La licencia más básica, formato de archivo mp3.", condiciones : "muchotexto", bgimage: licencia, precio: "5.99"},
      {id: 2, nombre: "WAV", descripcion : "Formato de archivo wav.", condiciones : "muchotexto", bgimage: licencia, precio: "15.99"},
      {id: 3, nombre: "STEMS", descripcion : "Licencia por pistas.", condiciones : "muchotexto", bgimage: licencia, precio: "29.99"},
      {id: 4, nombre: "EXCLUSIVA", descripcion : "Licencia exclusiva para un solo uso.", condiciones : "muchotexto", bgimage: licenciaexclusiva, precio: "99.99"},
    ]
    setLicencias(licenses)
  }

  useEffect(() => {
    getLicencias()
  }, [])

  return (
    <Modal
    activeModal={activeModal}
    onClose={() => setActiveModal(false)}
    title="Licencias"
    footer={
      <Button
        text="Close"
        btnClass="btn-primary"
        onClick={() => setActiveModal(false)}
      />
    }>



        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-2xl font-inter font-semibold'>Licencias del beat {beat.name}</h1>
            <div className='w-full grid grid-cols-2 gap-4'>

            {licencias.map((licencia) => (
              <div
                className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative cursor-pointer"
                style={{
                    backgroundImage: `url(${licencia.bgimage})`,
                    border: `2px solid ${licencia.id === selectedLicencia ? 'red' : 'transparent'}`
                }}
                key={licencia.id}
                onClick={() => licencia.id === selectedLicencia ? setSelectedLicencia(null) : setSelectedLicencia(licencia.id)}
                >
                    <div className="max-w-[169px]">
                        <div className="text-xl font-medium text-white mb-2">
                        {licencia.nombre}
                        </div>
                        <p className="text-sm text-white">{licencia.descripcion}</p>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center">
                        {licencia.precio}€
                    </div>
                </div>
            ))}

                
            </div>

            <div className='w-full flex flex-col justify-center items-center gap-4'>
              {selectedLicencia && licencias.filter(licencia => licencia.id === selectedLicencia)[0].condiciones}
              {selectedLicencia && 
              
                <div className='w-full flex justify-start items-start gap-4'>
                  <Button text="Añadir al carrito" className='btn-primary text-red-500 bg-white border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 ' onClick={hdlCarritoButton}/>
                  <Button text="Comprar" className='btn-primary bg-red-500 hover:bg-red-600 hover:border-red-600'/>
                </div>
                
                }
            </div>

        </div>
    </Modal>
  )
}

export default LicensesModal