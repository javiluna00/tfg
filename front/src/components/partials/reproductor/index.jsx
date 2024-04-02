import React, { useEffect, useRef, useState } from 'react'
import useReproductor from '@/hooks/useReproductor'
import {Icon} from '@iconify/react';
import "@/components/partials/reproductor/index.css";
import 'react-h5-audio-player/lib/styles.css';
import Button from '@/components/ui/Button';
import Marquee from "react-fast-marquee";
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useWidth from '@/hooks/useWidth';
import WideHUD from './wideHUD';
import MobileHUD from './mobileHUD';

function Reproductor({setActiveBeat, setModalBeat}) {

    const {reproductorData, setData, setReproductorData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume, shown, closeReproductor, toogleFav, favved} = useReproductor()
    
    const navigate = useNavigate();
    const {isAuthenticated, saveBeat} = useAuth()
    const {width, breakpoints} = useWidth();


    const audioRef = useRef()
    const progressBarRef = useRef()

    useEffect(() => {
        if(reproductorData.song)
        {
            if(reproductorData.isPlaying == true)
            {
                console.log("Reproduciendo")
                audioRef.current.play()
            }
            else
            {
                audioRef.current.pause()
            }
            
        }
    }, [reproductorData.isPlaying])

    useEffect(() => {
        if(audioRef.current)
            audioRef.current.volume = reproductorData.volume/100
    }, [reproductorData.volume])

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

    const handleMoveProgressBar = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        audioRef.current.currentTime = x / progressBarRef.current.offsetWidth * reproductorData.totalDuration
    }

    if(reproductorData.song)
    {
        return (
        <div className='audio-player'>
                <audio 
                    src={reproductorData.song_file} 
                    controls={false} 
                    ref={audioRef} 
                    onTimeUpdate={(e) => setData({...reproductorData, currentDuration: e.target.currentTime})}
                    onLoadedMetadata={(e) => setData({...reproductorData, totalDuration: e.target.duration, isPlaying : true})}
                    loop={reproductorData.looping}
                />

                {width > breakpoints.md ? 
                <WideHUD 
                    reproductorData={reproductorData} 
                    hdlClickComprar={hdlClickComprar} 
                    handleFavButton={handleFavButton} 
                    handleMuteButton={handleMuteButton} 
                    handleTooglePlayButton={handleTooglePlayButton} 
                    handleLoopButton={handleLoopButton} 
                    handleMoveProgressBar={handleMoveProgressBar} 
                    audioRef={audioRef} 
                    progressBarRef={progressBarRef} 
                    favved={favved} 
                    porcentajePlayed={porcentajePlayed} 
                    closeReproductor={closeReproductor}
                    setVolume={setVolume}
                /> : 
                <MobileHUD 
                    reproductorData={reproductorData} 
                    hdlClickComprar={hdlClickComprar} 
                    handleFavButton={handleFavButton} 
                    handleMuteButton={handleMuteButton} 
                    handleTooglePlayButton={handleTooglePlayButton} 
                    handleLoopButton={handleLoopButton} 
                    handleMoveProgressBar={handleMoveProgressBar} 
                    audioRef={audioRef} 
                    progressBarRef={progressBarRef} 
                    favved={favved} 
                    porcentajePlayed={porcentajePlayed} 
                    closeReproductor={closeReproductor}
                />
                }

        </div>      
            
        )
    }
    else{
        return (<></>)
    }

}

export default Reproductor