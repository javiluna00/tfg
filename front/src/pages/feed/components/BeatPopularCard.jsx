import { Icon } from '@iconify/react';
import React, { useState } from 'react'

function BeatPopularCard({beat}) {

    const [isHovered, setIsHovered] = useState(false);
    

    return (
        <div className='w-48 h-64 rounded-lg flex flex-col justify-center items-center gap-2'>
            <div className='h-4/5 rounded-xl overflow-hidden' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className='w-full h-full relative cursor-pointer'>
                    <img className={`w-full h-full object-cover`} src={beat.image}/>
                    {!isHovered && <div className='w-full h-full absolute backdrop-blur-sm inset-0'></div>}
                    {isHovered && 
                    <div className={`w-full h-full flex justify-center items-center absolute inset-0 opacity-0 hover:opacity-100 transition duration-300`}>
                        <Icon icon="ic:baseline-play-circle" className='w-12 h-12 text-zinc-600 hover:text-zinc-900 transition duration-300'/> 
                    </div>
                        }
                </div>
                    
                

            </div>
            <div className='h-1/5 w-full flex flex-col justify-center items-center gap-3'>
                <div className='h-4 w-full flex justify-start items-start px-2 gap-2'>
                    <span className='font-inter text-white text-xs font-semibold'>143bpm</span>
                    <span className='cursor-pointer font-inter text-red-400 text-xs font-semibold'>33.99 €</span>
                </div>
                <div className='w-full px-2 flex justify-start items-start'>
                    <span className='font-inter text-white font-semibold cursor-pointer hover:underline' onClick={() => navigate(`/beat/${beat.id}`)}>{beat.name}</span>
                </div>
                
            </div>
            

        </div>
    )
}

export default BeatPopularCard