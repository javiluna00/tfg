import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useBeatDetails from './hooks/useBeatDetails'
import SkeletionTable from '@/components/skeleton/Table'
import BeatDetailsCard from './components/BeatDetailsCard'
import useReproductor from '@/hooks/useReproductor'
import { useCartActions } from '@/hooks/useCartActions'
import useAuthBien from '@/hooks/useAuthBien'
import useBeats from '@/hooks/useBeats'

function BeatDetails () {
  const location = useLocation()
  const { setBeatId, loading, beat, error } = useBeatDetails()
  const { getRandomBeats, isLoading } = useBeats()
  const { reproductorData, reproducirCancion, setData } = useReproductor()
  const { addToCart } = useCartActions()
  const { isAuthenticated } = useAuthBien()

  useEffect(() => {
    setBeatId(location.pathname.split('/')[2])
  }, [location.pathname])


  return (
    <div className='w-full h-full bg-amber-50 min-h-[90vh]'>
      {/* <div className='absolute inset-0 filter blur-lg' style={{ backgroundImage: `url(${beat?.cover_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }} /> */}
      <div className='container py-10 z-20 h-full'>
        {loading && <SkeletionTable count={3} />}
        {!loading && error && <div className='text-red-500 font-bold'>{error}</div>}
        {!loading && beat && <BeatDetailsCard beat={beat} reproductorData={reproductorData} reproducirCancion={reproducirCancion} setData={setData} isAuthenticated={isAuthenticated} addToCart={addToCart} getRandomBeats={getRandomBeats} isLoading={isLoading} />}
      </div>
    </div>
  )
}

export default BeatDetails
