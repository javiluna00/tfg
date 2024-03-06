import Axios from '@/components/AxiosSubmit';
import { useCartActions } from '@/hooks/useCartActions';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


function SuccessCheckout() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const [stripeSession, setStripeSession] = useState(null)

  const [info, setInfo] = useState({})

  const {clearCart} = useCartActions()

  useEffect(() => {
    if(searchParams.get("session_id")) {
      setStripeSession(searchParams.get("session_id"))
    }
    else{
      navigate("/feed")
    }
  }, [])

  useEffect(() => {
    if(stripeSession)
    {
      Axios.post('stripe/getSessionInfo', {
        session_id: stripeSession
      }).then((res) => {

        console.log("Respuesta backend : ", res.data)
        clearCart()
        setInfo({
          download_urls : res.data.metadata 
        })

      }).catch((err) => {
        console.log(err)
      })
    }
  }, [stripeSession])

  return (
    <div className='container py-10'>
      <div className='w-full bg-slate-50 p-5 rounded-lg shadow'>
        <h3 className='text-3xl font-bold text-zinc-800'>¡Gracias por su compra!</h3>
        <p className='text-xl text-zinc-800 mt-5'>Su compra ha sido registrada con éxito. En breves minutos recibira un correo electrónico con el link de descarga del beat y la licencia.</p>
      </div>
    </div>
  )
}

export default SuccessCheckout