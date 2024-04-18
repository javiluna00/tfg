import React, { useEffect } from 'react'
import Beats from './Beats'
import { useOutletContext } from 'react-router-dom'
import SectionPresentation from './components/SectionPresentation'
import SectionSocial from './components/SectionSocial'
import useGenres from '@/hooks/useGenres'
import useMoods from '@/hooks/useMoods'
import useBeats from '@/hooks/useBeats'

function Feed () {
  const { setActiveBeat, setModalBeat } = useOutletContext()
  const { genres, loadGenresFromAPI } = useGenres()
  const { moods, loadMoodsFromAPI } = useMoods()
  const { activeBeats, loadActiveBeatsFromAPI, isLoading, filteredBeats, filter, setFilter } = useBeats()

  useEffect(() => {
    loadGenresFromAPI()
    loadMoodsFromAPI()
    loadActiveBeatsFromAPI()
  }, [])

  return (
    <div className='bg-[#000000] h-full'>

      <SectionPresentation />
      <SectionSocial />

      <Beats
        beatsPopularesRender
        setActiveBeat={setActiveBeat}
        setModalBeat={setModalBeat}
        genres={genres}
        moods={moods}
        filterActive
        isLoading={isLoading}
        filteredBeats={filteredBeats}
        filter={filter}
        setFilter={setFilter}
      />

    </div>

  )
}

export default Feed
