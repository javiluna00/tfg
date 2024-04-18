import CustomAxios from '@/components/api/axios'
import { useState } from 'react'
function usePurchases () {
  const { AxiosPrivate } = CustomAxios()

  const [purchases, setPurchases] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const getPurchasesFromAPI = () => {
    setIsLoading(true)
    AxiosPrivate.get('/purchases')
      .then((response) => {
        setPurchases(response.data)
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return { purchases, getPurchasesFromAPI, isLoading }
}

export default usePurchases
