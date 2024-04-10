import React, { useEffect, useState } from 'react'
import Beats from './Beats';
import { useOutletContext } from "react-router-dom";
import SectionPresentation from './components/SectionPresentation';
import SectionSocial from './components/SectionSocial';
import useBeatFinder from '@/hooks/useBeatFinder';
import { useRecoilValue } from 'recoil';
import { beatState } from '@/store/beatStore';
function Feed() {

  const {setActiveBeat, setModalBeat} = useOutletContext();
  const {AxiosPrivate} = useOutletContext();

  const {genres, moods, setGenres, setMoods, loading} = useBeatFinder({AxiosPrivate});
  const {filteredBeats, beatsPopulares, filter, setFilter} = useRecoilValue(beatState);

  useEffect(() => {
    console.log("setActiveBeat", setActiveBeat)
    console.log("setModalBeat", setModalBeat)
  }, [setActiveBeat, setModalBeat])
  return (
    <div className='bg-[#000000] h-full'>

            <SectionPresentation/>
            <SectionSocial/>
            <Beats 
              beatsPopularesRender={true} 
              setActiveBeat={setActiveBeat} 
              setModalBeat={setModalBeat} 
              genres={genres}
              moods={moods}
              setGenres={setGenres}
              setMoods={setMoods}
              loading={loading}
              filter={filter}
              setFilter={setFilter}
              filteredBeats={filteredBeats}
              beatsPopulares={beatsPopulares}
              AxiosPrivate = {AxiosPrivate}
            />

    </div>

  )
}

export default Feed