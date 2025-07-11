import Button from '@/components/ui/Button'
import Title from '@/components/ui/Title'
import useAuthBien from '@/hooks/useAuthBien'
import React, { useEffect, useState } from 'react'


function Licenses ({ beat, selectedLicense, setSelectedLicense, addToCart, isAuthenticated }) {
  
  const {isAdmin} = useAuthBien()

  const [downloadKey, setDownloadKey] = useState(null)


  const handleBuyButton = () => {
    if (selectedLicense) {
      addToCart({ beatId: selectedLicense.pivot.beat_id, licenseId: selectedLicense.pivot.license_id, isAuthenticated: isAuthenticated() })
    }
  }
  const handleDescargarLicencia = () => {
    if (selectedLicense && selectedLicense.pivot.download_key) {
      window.open(import.meta.env.VITE_API_URL + '/api/beatlicense/' + selectedLicense.pivot.download_key + '/download')
    }
  }

  return (
    <div className='mt-10 px-8 py-6 bg-zinc-900 rounded-lg'>
      <Title title='Licencias' className='text-white text-md font-bold uppercase tracking-widest text-center' />
      <div className='w-full flex md:flex-row flex-col justify-center items-center gap-4 mt-4'>
        {beat.licenses?.map((license, index) => (
          <Button key={index} onClick={() => setSelectedLicense(license)} className={`${selectedLicense?.id === license.id ? 'border-red-400 text-red-400' : 'border-zinc-500 hover:border-red-400 text-white'} border font-semibold text-center text-xs uppercase w-full py-2 px-4 rounded-lg h-14 hover:bg-zinc-800 flex justify-center items-center`}>{license.name}</Button>
        ))}
      </div>

      {selectedLicense && 
      <>
      <div className='mt-4 p-4 w-full'>
        <Title title='Descripción' className='text-white text-sm font-bold uppercase tracking-widest text-center' />
        <p className='text-zinc-400 font-semibold text-xs mt-2'>{selectedLicense?.description}</p>
      </div>

      <div className='mt-4 p-4 w-full'>
        <h4 className='text-white font-semibold text-sm uppercase'>Precio <span className='text-red-400'>{selectedLicense?.pivot.price}€</span></h4>
      </div>
      </>
      }
      {selectedLicense && 
      <div className='flex flex-col md:flex-row gap-4'>
        <Button text='Añadir al carrito' className='bg-red-500 hover:bg-red-600 text-white' onClick={handleBuyButton} />
        {isAdmin() && <Button text='Descargar licencia' className='bg-red-500 hover:bg-red-600 text-white' onClick={handleDescargarLicencia} />}
      </div>
      }
      
    </div>
  )
}

export default Licenses
