import React, { useEffect } from 'react'
import BeatCard from './components/BeatCard'
import BeatFilter from './components/BeatFilter'
import { useRecoilValue } from "recoil";
import { beatState } from "@/store/beatStore";
import useBeatFinder from '@/hooks/useBeatFinder'


function Beats() {

    const {filteredBeats, allBeats, beatsPopulares, filter, setFilter} = useRecoilValue(beatState);


    const beatsPopularesRender = beatsPopulares.map((beat) => {
        return (
            <BeatCard beat={beat} key={beat.id} />
        )
    })

    useEffect(() => {
        console.log("filteredBeats en el archivo de renderizado : ", filteredBeats)
    }, [filteredBeats])



    return (
        <div className='relative'>

            <div className='container' style={{width: "100%"}}>
                <div className='mt-10'>
                    <span className='text-2xl font-inter font-semibold text-white'>Beats populares jeje</span>
                    <hr className='mt-2 mb-10'/>
                    <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center'>
                        {beatsPopularesRender}
                    </div>
                </div>

                <div className='mt-28 mb-10 w-full'>
                    <span className='text-2xl font-inter font-semibold text-white'>Todos los beats</span>
                    <hr className='mt-2 mb-10'/>
                    <div className='m-auto w-8/12 flex justify-center items-center gap-5 border-b border-white px-2 py-5 mt-10 mb-20'>
                        <BeatFilter filter={filter} setFilter={setFilter}/>
                    </div>
                    
                    <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center'>
                        {filteredBeats.map((beat, index) => (
                            <BeatCard beat={beat} key={index}/>
                        ))}
                    </div>
                </div>

                
            </div>

        </div>
    )
}

export default Beats