import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useCartActions } from '@/hooks/useCartActions'

function LicensesModal ({ activeModal, setActiveModal, beat, isAuthenticated, AxiosPrivate }) {
  const [licencias, setLicencias] = useState([])
  const [selectedLicencia, setSelectedLicencia] = useState(null)

  const { addToCart } = useCartActions({ AxiosPrivate })

  const hdlCarritoButton = () => {
    if (selectedLicencia) {
      const licenciaSeleccionada = licencias.find(licencia => licencia.id === selectedLicencia)
      if (licenciaSeleccionada) {
        addToCart({ beatId: licenciaSeleccionada.pivot.beat_id, licenseId: licenciaSeleccionada.pivot.license_id, isAuthenticated: isAuthenticated() }) // Añade el item al carrito
        setActiveModal(false)
        setSelectedLicencia(null)
      }
    }
  }

  // OBTENER LICENCIAS PARA EL BEAT EN ESPECÍFICO
  const getLicencias = () => {
    const licenses = []

    if (beat.licenses) {
      for (let i = 0; i < beat.licenses.length; i++) {
        licenses.push(beat.licenses[i])
      }
    }

    setLicencias(licenses)
  }

  useEffect(() => {
    getLicencias()
  }, [beat])

  return (
    <Modal
      activeModal={activeModal}
      onClose={() => setActiveModal(false)}
      title={`Licencias del beat ${beat.name}`}
      themeClass='bg-zinc-800'
    >

      <div className='w-full'>
        <div className='w-full flex flex-col justify-center items-center gap-4'>

          {licencias.map((licencia) => (
            <div
              className={`w-full ${licencia.id === selectedLicencia ? 'bg-red-800' : 'bg-zinc-800'} p-4 rounded-[6px] relative cursor-pointer`}
              style={{
                border: `1px solid ${licencia.id === selectedLicencia ? 'red' : 'transparent'}`
              }}
              key={licencia.id}
              onClick={() => licencia.id === selectedLicencia ? setSelectedLicencia(null) : setSelectedLicencia(licencia.id)}
            >
              <div className='max-w-[169px]'>
                <div className='text-xl font-medium text-white mb-2'>
                  {licencia.name}
                </div>
                <p className='text-sm text-white'>{licencia.description}</p>
              </div>
              <div className='absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center'>
                {licencia.pivot.price}€
              </div>
            </div>
          ))}

        </div>

        <div className='w-full flex flex-col justify-center items-center gap-4'>
          {selectedLicencia && licencias.filter(licencia => licencia.id === selectedLicencia)[0].condiciones}
          {selectedLicencia &&

            <>
              <div className='h-px w-full bg-red-600 my-5' />
              <div className='w-full'>
                <h3 className='text-xl font-inter font-semibold text-white'>Condiciones</h3>
                <p className='text-sm'>{licencias.filter(licencia => licencia.id === selectedLicencia)[0].conditions}</p>
              </div>

              <div className='w-full flex justify-start items-start gap-4'>
                <Button text='Añadir al carrito' className='bg-red-500 hover:bg-red-600 text-white' onClick={hdlCarritoButton} />
              </div>
            </>}
        </div>
      </div>
    </Modal>
  )
}

export default LicensesModal
