import useBeats from '@/hooks/useBeats'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function useBeatDetails () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [beat, setBeat] = useState(null)
  const [beatId, setBeatId] = useState(null)
  const { getOneBeat } = useBeats()
  const { isAdmin } = useOutletContext()
  useEffect(() => {
    if (beatId) {
      setError(null)
      setLoading(true)
      getOneBeat(beatId, isAdmin() ? 'full' : 'client').then((res) => {
        setBeat(res)
      }).catch((err) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [beatId])

  return { beat, beatId, setBeatId, loading, error }
}

export default useBeatDetails
