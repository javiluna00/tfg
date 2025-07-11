import React, { useEffect, useState } from 'react'
import BeatCard from './components/BeatCard'
import SkeletonBeats from './components/SkeletonBeats'
import BeatFilter from './components/BeatFilter'
import { useLocation, useParams } from 'react-router-dom'
import useReproductor from '@/hooks/useReproductor'

function Beats ({
  filteredBeats,
  filter,
  setFilter,
  beatsPopularesRender,
  setModalBeat,
  setActiveBeat,
  genres,
  isLoading,
  filterActive = false,
  moods
}) {
  const [selectedGenres, setSelectedGenres] = useState(genres)
  const [selectedMoods, setSelectedMoods] = useState(genres)
  const { reproductorData, reproducirCancion, setData } = useReproductor()
  const [searchParams, setSearchParams] = useState()

  const location = useLocation()

  useEffect(() => {
    setSearchParams(new URLSearchParams(location.search))
  }, [location])

  useEffect(() => {
    if(searchParams)
    {
      const id = searchParams.get('play')

      if(filteredBeats && filteredBeats.length > 0)
      {

        const beat = filteredBeats.find((beat) => beat.id == id)
        if(beat)
        {

          reproducirCancion(beat)
        }
      }
    }
  }, [searchParams, filteredBeats])

  return (
    <div className='relative min-h-screen bg-amber-50'>

      <div style={{ width: '100%' }}>
        {beatsPopularesRender === true &&
          <div className='bg-zinc-900 py-20 border-b border-red-500'>
            <div className='container'>

              <span className='text-2xl font-inter font-semibold text-white'>Beats populares</span>
              <hr className='mt-2 mb-2' />

              {isLoading && <SkeletonBeats />}
              {!isLoading && filteredBeats?.length === 0 && <span className='block w-full text-xl text-white text-center mt-10 h-64'>No hay beats que mostrar</span>}
              {!isLoading && filteredBeats?.length > 0 &&
                <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-3 justify-center items-center mt-10'>
                  {filteredBeats.map((beat, index) => (
                    <div className='flex justify-center items-center w-full' key={index}>
                      <BeatCard beat={beat} key={index} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat} />
                    </div>
                  ))}
                </div>}

            </div>
          </div>}

        <div className='bg-amber-50'>
          <div className='py-10 w-full container'>
            {/* <span className='text-2xl font-inter font-semibold text-white'>Todos los beats</span>
            <hr className='mt-2 mb-2' />
            <div className='m-auto w-8/12 flex flex-col justify-center items-center gap-5 p-5 my-2 '>

              {filterActive &&
                <div className='p-5 rounded-lg bg-zinc-900 w-full'>
                  <BeatFilter filter={filter} setFilter={setFilter} genres={genres} moods={moods} selectedGenres={selectedGenres} selectedMoods={selectedMoods} setSelectedGenres={setSelectedGenres} setSelectedMoods={setSelectedMoods} />
                </div>}
              <hr className='w-full' />
            </div> */}

            {isLoading && <SkeletonBeats />}
            {!isLoading && filteredBeats?.length === 0 && <span className='block w-full text-xl text-white text-center mt-10 h-64'>No hay beats que mostrar</span>}
            {!isLoading && filteredBeats?.length > 0 &&
              <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center mt-10'>
                {filteredBeats?.map((beat, index) => (
                  <div className='flex justify-center items-center w-full' key={index}>
                    <BeatCard beat={beat} key={index} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat} />
                  </div>
                ))}
              </div>}

          </div>
        </div>

      </div>

    </div>
  )
}

export default Beats
