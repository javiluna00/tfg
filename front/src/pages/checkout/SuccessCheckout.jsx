import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useStripe from '@/hooks/useStripe'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SuccessCheckout () {
  const { getSessionInfo, info } = useStripe()

  console.log("Info : ", info)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [stripeSession, setStripeSession] = useState(null)

  useEffect(() => {
    if (searchParams.get('session_id')) {
      setStripeSession(searchParams.get('session_id'))
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (stripeSession) {
      getSessionInfo({ sessionId: stripeSession })
    }
  }, [stripeSession])

  return (
    <div className='bg-amber-50 min-h-[70vh] flex flex-col justify-center items-center'>
    <div className='container py-10'>
      <div className='w-full bg-amber-50 p-5 rounded-lg'>
        <div className='flex flex-col justify-center items-center'>
          <Icon icon='ic:round-check-circle' className='w-16 h-16 text-green-500' />
          <h3 className='text-3xl font-bold text-zinc-800 text-center'>¡Gracias por su compra!</h3>
        </div>
        <p className="text-lg text-zinc-800 mt-2 text-center">Su compra ha sido realizada con éxito.</p>
        <p className='text-sm text-zinc-800 mt-5 text-center'>En breves minutos recibira un correo electrónico con el link de descarga del beat y la licencia.</p>

        <p className='text-xs text-zinc-800 mt-2 text-center'>Si no recibe el correo electrónico en unos minutos, revise su carpeta de spam.</p>

        <div className='h-[1px] w-3/4 mx-auto bg-zinc-700 my-5' />

        {info !== null
          ? <div className='w-full'>
            <h3 className='text-xl font-semibold text-zinc-800 text-start'>Descargas</h3>

            <div className='flex flex-col justify-center items-start gap-5 mt-5'>
              {info.licensesBought.map((license) => (
                <div key={license.id} className='rounded-lg bg-zinc-800 p-5 flex justify-center items-center gap-5'>
                  <img src={license.cover_url} className='w-20 h-20 object-cover rounded-lg' />
                  <div className='flex flex-col justify-center items-start gap-2'>
                    <h3 className='text-xl font-bold text-amber-50'>{license.name}</h3>
                    <Button className='text-sm text-amber-50 bg-red-500 hover:bg-red-600' icon='heroicons-outline:download' onClick={() => window.open(import.meta.env.VITE_API_URL + '/api/beatlicense/' + license.download_key + '/download')} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          : <SkeletionTable />}
      </div>
    </div>
    </div>
  )
}

export default SuccessCheckout
