import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useStripe from '@/hooks/useStripe'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SuccessCheckout () {
  const { getSessionInfo, info } = useStripe()
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
    <div className='container py-10'>
      <div className='w-full bg-zinc-50 p-5 rounded-lg shadow'>
        <div className='flex flex-col justify-center items-center'>
          <Icon icon='ic:round-check-circle' className='w-16 h-16 text-green-500' />
          <h3 className='text-3xl font-bold text-zinc-800 text-center'>¡Gracias por su compra!</h3>
        </div>

        <p className='text-sm text-zinc-800 mt-5 text-center'>Su compra ha sido registrada con éxito. En breves minutos recibira un correo electrónico con el link de descarga del beat y la licencia.</p>
      </div>
      <div className='w-full bg-zinc-50 p-5 rounded-lg shadow mt-5'>

        {info !== null
          ? <div className='w-full'>
            <h3 className='text-3xl font-bold text-zinc-800 text-center'>Descarga</h3>

            <div className='flex flex-col justify-center items-center gap-5 mt-5'>
              {info.licensesBought.map((license) => (
                <div key={license.id} className='rounded-lg bg-slate-100 p-5 flex justify-center items-center gap-5'>
                  <img src={license.cover_url} className='w-20 h-20 object-cover rounded-lg' />
                  <div className='flex flex-col justify-center items-center gap-2'>
                    <h3 className='text-xl font-bold text-zinc-800'>{license.name}</h3>
                    <Button className='text-sm text-white bg-red-500' icon='heroicons-outline:download' text='Descargar' onClick={() => window.open('http://localhost:8000/api/beatlicense/' + license.download_key + '/download')} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          : <SkeletionTable />}
      </div>
    </div>
  )
}

export default SuccessCheckout
