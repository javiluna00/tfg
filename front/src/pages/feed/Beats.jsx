import React, { useEffect } from 'react'
import BeatCard from './components/BeatCard'
import BeatFilter from './components/BeatFilter'
import { useRecoilValue } from "recoil";
import { beatState } from "@/store/beatStore";
import useBeatFinder from '@/hooks/useBeatFinder'


function Beats({setModalBeat, setActiveBeat}) {

    const {filteredBeats, allBeats, beatsPopulares, filter, setFilter} = useRecoilValue(beatState);

    const {loadBeatsFromAPI, loadGenresFromAPI, loadMoodsFromAPI, foundBeats, genres, moods, setGenres, setMoods} = useBeatFinder();

    const beatsPopularesRender = beatsPopulares.map((beat) => {
        return (
            <div className='flex justify-center items-center w-full' key={beat.id}>
                <BeatCard beat={beat} key={beat.id} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat}/>
            </div>
            
        )
    })

    useEffect(() => {
        loadBeatsFromAPI()
        loadGenresFromAPI()
        loadMoodsFromAPI()
    }, [])


    return (
        <div className='relative'>

            <div className='container' style={{width: "100%"}}>
                <div className='mt-10'>
                    <span className='text-2xl font-inter font-semibold text-white'>Beats populares</span>
                    <hr className='mt-2 mb-10'/>
                    <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center bg-red-500 rounded-lg p-5'>
                        {beatsPopularesRender}         
                    </div>
                </div>

                <div className='mt-28 mb-10 w-full'>
                    <span className='text-2xl font-inter font-semibold text-white'>Todos los beats</span>
                    <hr className='mt-2 mb-10'/>
                    <div className='m-auto w-8/12 flex justify-center items-center gap-5 border-b border-white px-2 py-5 mt-10 mb-20'>
                        <BeatFilter filter={filter} setFilter={setFilter} genres={genres} moods={moods} setGenres={setGenres} setMoods={setMoods}/>
                    </div>
                    
                    <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center'>
                        {filteredBeats.map((beat, index) => (
                            <div className='flex justify-center items-center w-full' key={index}>
                                <BeatCard beat={beat} key={index} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat}/>
                            </div>
                        ))}
                    </div>
                </div>

                
            </div>

        </div>
    )
}

export default Beats