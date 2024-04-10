import { useEffect, useState } from 'react'
import { useCartActions } from './useCartActions'
import { useNavigate } from 'react-router-dom'
import CustomAxios from '@/components/api/axios'

function useStripe () {
  const { AxiosPrivate } = CustomAxios()
  const { clearCart } = useCartActions({ AxiosPrivate })
  const [info, setInfo] = useState(null)
  const { navigate } = useNavigate()

  useEffect(() => {
    if (info) {
      console.log('Info : ', info)
    }
  }, [info])

  const getSessionInfo = ({ sessionId }) => {
    return AxiosPrivate.post('stripe/getSessionInfo', {
      session_id: sessionId
    }).then((res) => {
      clearCart()
      setInfo({
        email: res.data.metadata.email,
        isLogged: res.data.metadata.isLogged,
        userId: res.data.metadata.userId,
        licensesBought: JSON.parse(res.data.metadata.licenses_bought)
      })
    }).catch((err) => {
      console.log(err)
      navigate('/')
    })
  }

  return {
    getSessionInfo,
    info
  }
}

export default useStripe
