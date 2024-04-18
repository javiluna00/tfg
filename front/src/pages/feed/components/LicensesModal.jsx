import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useCartActions } from '@/hooks/useCartActions'
import Title from '@/components/ui/Title'

function LicensesModal ({ activeModal, setActiveModal, beat, isAuthenticated }) {
  useEffect(() => {
    if (beat) {
      console.log('Beat :', beat)
    }
  }, [beat])
  const [selectedLicense, setSelectedLicense] = useState(null)

  const { addToCart } = useCartActions()

  const handleBuyButton = () => {
    if (selectedLicense) {
      const selectedLicenseData = beat.licenses.find(license => license.id === selectedLicense)

      addToCart({ beatId: selectedLicenseData.pivot.beat_id, licenseId: selectedLicenseData?.pivot.license_id, isAuthenticated: isAuthenticated() })
      setActiveModal(false)
      setSelectedLicense(null)
    }
  }

  if (beat && beat.licenses) {
    return (
      <Modal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        title={`Licencias del beat ${beat?.name}`}
      >
        <div className='w-full bg-zinc-900 rounded-lg'>
          <div className='w-full flex md:flex-row flex-col justify-center items-center gap-4 mt-4'>
            {beat?.licenses?.map((license, index) => {
              if (license?.name === 'Licencia exclusiva') {
                return (<Button icon='mdi:timer-outline' key={index} onClick={() => setSelectedLicense(license.id)} className={`${selectedLicense === license.id ? 'border-red-400 text-red-400' : 'border-zinc-500 hover:border-red-400 text-white'} border font-semibold text-center text-xs uppercase w-full py-2 px-4 rounded-lg h-14 hover:bg-zinc-800 flex justify-center items-center`}>{license?.name}</Button>)
              } else {
                return (<Button key={index} onClick={() => setSelectedLicense(license.id)} className={`${selectedLicense === license.id ? 'border-red-400 text-red-400' : 'border-zinc-500 hover:border-red-400 text-white'} border font-semibold text-center text-xs uppercase w-full py-2 px-4 rounded-lg h-14 hover:bg-zinc-800 flex justify-center items-center`}>{license?.name}</Button>)
              }
            })}
          </div>

          <div className='mt-4 p-4 w-full'>
            <Title title='Descripción' className='text-white text-sm font-bold uppercase tracking-widest text-center' />
            <p className='text-zinc-400 font-semibold text-xs mt-2'>{beat?.licenses[selectedLicense - 1]?.description}</p>
          </div>

          <div className='mt-4 p-4 w-full'>
            <h4 className='text-white font-semibold text-sm uppercase'>Precio <span className='text-red-400'>{beat?.licenses[selectedLicense - 1]?.pivot.price}€</span></h4>
          </div>
          <div className='mt-4 p-4 w-full'>
            {selectedLicense && <Button text='Añadir al carrito' className='bg-red-500 hover:bg-red-600 text-white' onClick={handleBuyButton} />}
          </div>
        </div>
      </Modal>
    )
  }
}

export default LicensesModal
