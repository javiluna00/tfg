import React, { useEffect, useState } from 'react'
import useReproductor from '@/hooks/useReproductor'
import {Icon} from '@iconify/react';
import "@/components/partials/reproductor/index.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Button from '@/components/ui/Button';
import Marquee from "react-fast-marquee";
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

function Reproductor({setActiveBeat, setModalBeat}) {

    const {reproductorData, setReproductorData, setLooping, toogleMute, tooglePlay, setVolume, shown, closeReproductor, toogleFav, favved} = useReproductor()
    
    const navigate = useNavigate();
    const {isAuthenticated, saveBeat} = useAuth()

    const hdlClickComprar = () => {
        setModalBeat(true)
        setActiveBeat(reproductorData.song)
    }

    const handleComprar = (e) => {
        e.preventDefault()
        //EJECUTAR MODAL LICENCIAS 
    }
    const handleLoopButton = (e) => {
        setLooping(!reproductorData.looping)
    }

    const handleFavButton = async (e) => {
        await toogleFav(reproductorData.song.id)
        await saveBeat(reproductorData.song.id)
    }
    const handleMuteButton = (e) => {
        toogleMute()
    }
    const handleTooglePlayButton = () => {
        tooglePlay()
    }

    if(reproductorData.song)
    {
        return (
            <div className='h-24 bg-neutral-900 flex justify-start items-center gap-2 bottom-0 fixed shadow-xl z-50' style={{width:"70%", marginLeft:"15%"}}>
                <div className='h-24 w-3/12 flex flex-row justify-start items-center gap-5'>
                    <img className={`hidden sm:block h-full object-cover aspect-square`} src={reproductorData.song.cover_path}/>
                    <div className='ml-2 sm:ml-0 h-full py-3 flex flex-col justify-start items-start w-2/5'>
                        <Marquee><span className='text-white font-semibold text-sm cursor-pointer hover:underline' onClick={(e) => navigate(`/beat/${reproductorData.song.id}`)}>{reproductorData.song.name}</span></Marquee>
                        <div className='mt-2 flex flex-row justify-start items-center gap-2'>
                            <Icon icon="ic:baseline-speed" className='text-white'/>
                            <span className='text-xs text-red-400 truncate'>{reproductorData.song.bpm} bpm</span>                            
                        </div>
                        <div className='mt-2 flex flex-row justify-start items-center gap-2'>
                            <Icon icon="ic:baseline-music-note" className='text-white'/>
                            <span className='text-xs text-red-400 truncate'>{reproductorData.song.scale}</span>                            
                        </div>

                    </div>
                    <div className='ml-0 xs:ml-10 flex flex-row justify-center items-center'>
                        <Button className='h-10 bg-red-500 text-white hover:bg-red-600 hover:border-white' onClick={hdlClickComprar}>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <Icon icon="ic:round-shopping-cart"/>
                                <span className='hidden sm:block'>{reproductorData.song.licenses[0].pivot.price}€</span>
                            </div>
                        </Button>
                    </div>
                    
                </div>

                <div className='h-24 w-9/12 flex flex-row justify-center items-center gap-5'>
                    {favved == true ? 
                        <Icon icon="ic:baseline-favorite" className='h-6 w-6 text-red-500 cursor-pointer hover:text-red-600 transition duration-300' onClick={(e) => handleFavButton(e)}/>
                    :
                        <Icon icon="ic:baseline-favorite-border" className='h-6 w-6 text-white cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleFavButton(e)}/>
                    }
                    
                    {reproductorData.isPlaying ? <Icon icon="ic:baseline-play-circle" className='text-white w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()}/> : <Icon icon="ic:baseline-pause-circle" className='text-white w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()}/>}


                    {reproductorData.looping == true ? 
                        <Icon icon="ic:twotone-loop" className='text-red-500 w-6 h-6 cursor-pointer hover:text-red-600 transition duration-300' onClick={(e) => handleLoopButton(e)}/> 
                    : 
                        <Icon icon="ic:twotone-loop" className='text-white w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleLoopButton(e)}/>  
                    }
                    

                </div>

                <div className='w-3/12 flex flex-row justify-center items-center gap-3'>
                    <Icon icon={reproductorData.isMuted ? "ic:baseline-volume-off" : (reproductorData.volume < 50 ? "ic:baseline-volume-down" : "ic:baseline-volume-up")} className='text-white w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleMuteButton(e)}/>
                    <input type="range" className='w-24 h-0.5' value={reproductorData.isMuted ? 0 : reproductorData.volume} min={0} max={100} step="any" onChange={(e) => setVolume(e.target.value)}/>
                </div>

                <div className='-top-4 absolute left-0 h-px w-full'>
                    <input type="range" className='w-full h-px' value={reproductorData.currentTime} min={0} max={reproductorData.duration} step="any"/>
                </div>
                

                <div className='absolute top-0 right-0 p-2'>
                    <Icon icon="ic:baseline-close" className='text-white w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => closeReproductor(e)}/>
                </div>

                
            </div>
        )
    }
    else{
        return (<></>)
    }

}

export default Reproductor