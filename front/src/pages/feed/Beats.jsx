import React, { useEffect } from 'react'
import BeatCard from './components/BeatCard'
import BeatFilter from './components/BeatFilter'
import { useRecoilValue } from "recoil";
import { beatState } from "@/store/beatStore";
import useBeatFinder from '@/hooks/useBeatFinder'
import SkeletionTable from '@/components/skeleton/Table';



function Beats({setModalBeat, setActiveBeat}) {

    const {filteredBeats, allBeats, beatsPopulares, filter, setFilter} = useRecoilValue(beatState);

    const {loadBeatsFromAPI, loadGenresFromAPI, loadMoodsFromAPI, foundBeats, genres, moods, setGenres, setMoods, loading} = useBeatFinder();


    return (
        <div className='relative'>

            <div style={{width: "100%"}}>
                <div className='bg-zinc-900 py-20 border-b border-red-500'>
                    <div className='container'>

                        <span className='text-2xl font-inter font-semibold text-white'>Beats populares</span>
                        <hr className='mt-2 mb-2'/>

                        {loading ? <SkeletionTable/> :
                        <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center rounded-lg p-5'>
                            {beatsPopulares.map((beat, index) => (
                                <div className='flex justify-center items-center w-full' key={index}>
                                    <BeatCard beat={beat} key={beat.id} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat}/>
                                </div>
                            ))}        
                        </div>                     
                        }

                    </div>
                </div>

                <div className='bg-zinc-700'>
                    <div className='py-10 w-full container'>
                        <span className='text-2xl font-inter font-semibold text-white'>Todos los beats</span>
                        <hr className='mt-2 mb-2'/>
                        <div className='m-auto w-8/12 flex flex-col justify-center items-center gap-5 p-5 my-2 '>
                            <div className='p-5 rounded-lg bg-zinc-900 w-full'>
                                <BeatFilter filter={filter} setFilter={setFilter} genres={genres} moods={moods} setGenres={setGenres} setMoods={setMoods}/>
                            </div>
                            <hr className='w-full'/>
                        </div>
                        
                        {loading ? <SkeletionTable/> :
                        <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center mt-10'>
                            {filteredBeats.map((beat, index) => (
                                <div className='flex justify-center items-center w-full' key={index}>
                                    <BeatCard beat={beat} key={index} setModalBeat={setModalBeat} setActiveBeat={setActiveBeat}/>
                                </div>
                            ))}
                        </div>                       
                        }

                    </div>
                </div>
                

                
            </div>

        </div>
    )
}

export default Beats