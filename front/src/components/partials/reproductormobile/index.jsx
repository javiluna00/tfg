import React, { useEffect } from 'react'
import useReproductor from '@/hooks/useReproductor'
import { Icon } from '@iconify/react'
import Marquee from 'react-fast-marquee'
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

function ReproductorMobile() {

    const {reproductorData, setReproductorData, porcentajePlayed} = useReproductor()
    const navigate = useNavigate()


    if(reproductorData.song)
    {
        return (
            <div className='h-24 w-full bg-neutral-900 flex justify-start items-center gap-2 bottom-0 fixed'>
                <div className='h-24 basis-9/12 flex flex-row justify-start items-center gap-5'>
                    <img className={`h-full object-cover aspect-square`} src={reproductorData.song.image}/>
                    <div className='ml-0 h-full py-3 flex flex-col justify-start items-start gap-2'>
                        <Marquee><span className='text-white font-semibold text-sm cursor-pointer' onClick={(e) => navigate(`/beat/${reproductorData.song.id}`)}>{reproductorData.song.name}</span></Marquee>
                        <div className='mt-2 flex flex-row justify-center items-center gap-10'>
                            <Button className='bg-red-500 text-white hover:bg-red-600 hover:border-white'>
                                <div className='flex flex-row justify-center items-center gap-2'>
                                    <Icon icon="ic:round-shopping-cart"/>
                                    <span className='text-xs'>{reproductorData.song.precio}€</span>
                                </div>
                            </Button>

                            <Icon icon="ic:baseline-favorite-border" className='h-5 w-5 text-white cursor-pointer hover:text-red-500 transition duration-300'/>
                        </div>

                    </div>
                </div>
                <div className='h-24 basis-3/12'>
                    <div className='flex flex-col h-full justify-center items-center'>
                        <Icon icon="ic:baseline-play-circle" className='text-white w-12 h-12 cursor-pointer'/>
                    </div>
                </div>
                {/* <div className='-top-0.5 absolute left-0 h-0.5 bg-white' style={{width:{getPorcentagePlayed}}}>

                </div>
                <div className='absolute -top-1.5 h-3 w-3 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition duration-100' style={{left:{getPorcentagePlayed}}}>
                
                </div> */}
                <div className='-top-4 absolute left-0 h-0.5 w-full'>
                    <input type="range" className='w-full h-0.5' id='reproductor' value={porcentajePlayed}/>
                </div>
            </div>
        )
    }
}

export default ReproductorMobile