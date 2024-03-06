import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import useReproductor from '@/hooks/useReproductor';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import LicensesModal from './LicensesModal';

function BeatCard({beat, setModalBeat, setActiveBeat}) {

    const [isHovered, setIsHovered] = useState(false);

    const [modal, setModal] = useState(false);
    const {reproductorData, reproducirCancion, setReproductorData} = useReproductor();

    const hdlClick = () => {
        setModalBeat(true);
        setActiveBeat(beat);
    }

    const navigate = useNavigate();

        return (
            <div className='w-48 h-64 rounded-lg flex flex-col justify-center items-center gap-2'>
                <div className={`h-9/12 `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className={`w-full h-full rounded-xl relative cursor-pointer overflow-hidden border-red-600 ${isHovered || beat.id === reproductorData?.song?.id ? 'border-2':''}`}>
                        <img className={`w-full h-full object-cover aspect-square ${isHovered || beat.id === reproductorData?.song?.id ? 'blur-none brightness-75 ' : "blur-sm"} transition duration-300`} src={beat.cover_path} onClick={() => navigate(`/beat/${beat.id}`)}/>
                        
                        {isHovered && 
                        <div className={`w-full h-full flex justify-center items-center absolute inset-0 opacity-0 hover:opacity-100 transition duration-300`} onClick={()=>setReproductorData(beat)}>
                            <Icon icon="ic:baseline-play-circle" className='w-12 h-12 text-white hover:text-red-600 transition duration-300' onClick={()=>setReproductorData(beat)}/> 
                        </div>
                            }
                    </div>
                        
                    
    
                </div>
                <div className='h-3/12 w-full flex flex-col justify-center items-center'>
                    <div className='h-1/2 w-full flex justify-start items-center px-2 gap-2 py-2'>
                        <span className='font-inter text-white text-xs font-semibold'>{beat.bpm} bpm</span>
                        <span className='cursor-pointer font-inter text-red-400 text-xs font-semibold' onClick={hdlClick}>{beat.licenses[0].pivot.price}€</span>
                        {beat.new && <Badge label="New!" className='bg-yellow-500 text-[#000] pill text-xs'/>}
                    </div>
                    <div className='w-full h-1/2 px-2 flex justify-start items-start'>
                        <span className='font-inter text-white font-semibold cursor-pointer hover:underline truncate' onClick={() => navigate(`/beat/${beat.id}`)}>{beat.name}</span>
                    </div>
                    
                </div>
            </div>       
        )
    
}

export default BeatCard