import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import SuggestedBeats from './SuggestedBeats'
import Licenses from './Licenses'
import BeatInfo from './BeatInfo'
import Title from '@/components/ui/Title'
function BeatDetailsCard ({ beat, reproductorData, reproducirCancion, setData, addToCart, isAuthenticated, getRandomBeats, isLoading }) {
  const [selectedLicense, setSelectedLicense] = useState(null)
  const [randomBeats, setRandomBeats] = useState([])


  useEffect(() => {
    getRandomBeats({ currentBeatId: beat.id }).then((res) => {
      console.log('Random beats : ', res)
      setRandomBeats(res)
    })
  }, [])

  return (
    <div className='w-full dark:bg-slate-700 rounded-md'>
      <div className='flex flex-col md:flex-row justify-center items-start gap-10'>

        <BeatInfo beat={beat} />

        <div className='basis-1/2 h-auto min-h-[400px] '>
          <img src={beat.cover_path} className='w-full h-full rounded-lg object-center object-cover aspect-square border-red-600' alt={'Portada del beat ' + beat.title} />
        </div>
        <div className='grow basis-1/4 rounded-lg flex flex-col justify-start items-center gap-4 w-full'>
          <div className='bg-zinc-900 rounded-lg p-4 w-full flex flex-col justify-center items-center gap-4 transition duration-300'>
            <Title title='Reproductor' className='text-white text-xs font-bold uppercase tracking-widest text-center' />
            {beat.id === reproductorData?.song?.id
              ? reproductorData.isPlaying
                ? <Icon icon='ic:baseline-pause-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300 cursor-pointer' onClick={() => setData({ ...reproductorData, isPlaying: false })} />
                : <Icon icon='ic:baseline-play-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300 cursor-pointer' onClick={() => setData({ ...reproductorData, isPlaying: true })} />
              : <Icon icon='ic:baseline-play-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300 cursor-pointer' onClick={() => reproducirCancion(beat)} />}
          </div>
          {!isLoading && randomBeats.length > 0 && <SuggestedBeats randomBeats={randomBeats} />}
        </div>

      </div>

      <Licenses beat={beat} selectedLicense={selectedLicense} setSelectedLicense={setSelectedLicense} addToCart={addToCart} isAuthenticated={isAuthenticated} />

    </div>
  )
}

export default BeatDetailsCard
