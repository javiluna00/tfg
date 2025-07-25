import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import useReproductor from '@/hooks/useReproductor'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import dayjs from 'dayjs'
import useWidth from '@/hooks/useWidth'

function BeatCard ({ beat, setModalBeat, setActiveBeat, size = 'normal', shadowed = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const daysAgo = 3
  const { reproductorData, reproducirCancion, setData } = useReproductor()
  const { width, breakpoints } = useWidth()
  const hdlClick = () => {
    setModalBeat(true)
    setActiveBeat(beat)
  }

  const navigate = useNavigate()

  const handleClickInfo = () => {
    navigate(`/beat/${beat.id}`)  
  }

  const handleClickPlay = (beat) => {
    console.log("Beat : ", beat)
    reproducirCancion(beat)
  }

  if (size === 'normal') {
    return (
      <div className='flex flex-col justify-start h-72 items-center gap-6'>
      <div className='w-48 h-48 rounded-lg flex flex-col justify-center items-center gap-2' onClick={() => handleClickPlay(beat)}>
        <div className='h-9/12 ' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className={`w-full h-full rounded-xl relative cursor-pointer overflow-hidden border-red-600 ${isHovered || beat.id === reproductorData?.song?.id ? 'border-0' : ''}`}>
            <img className={`w-full h-full object-cover aspect-square ${isHovered || beat.id === reproductorData?.song?.id ? 'blur-none' : 'blur-none brightness-75'} transition duration-300`} src={beat.cover_path}/>

            {/* {isHovered &&
              <div className='w-full h-full flex justify-center items-center absolute inset-0 opacity-0 hover:opacity-100 transition duration-300'>
                {beat.id === reproductorData?.song?.id
                  ? reproductorData.isPlaying
                    ? <Icon icon='ic:baseline-pause-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300' onClick={() => setData({ ...reproductorData, isPlaying: false })} />
                    : <Icon icon='ic:baseline-play-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300' onClick={() => setData({ ...reproductorData, isPlaying: true })} />
                  : <Icon icon='ic:baseline-play-circle' className='w-12 h-12 text-white hover:text-red-600 transition duration-300' onClick={() => handleClickPlay(beat)} />}
              </div>
              } */}
          </div>

        </div>
        {/* <div className='h-3/12 w-full flex flex-col justify-center items-center'>
          <div className='h-1/2 w-full flex justify-start items-center px-2 gap-2 py-2'>
            <span className='font-inter text-white text-xs font-semibold'>{beat.bpm} bpm</span>
            <span className='cursor-pointer font-inter text-red-400 text-xs font-semibold' onClick={hdlClick}>{beat?.licenses[0]?.pivot.price}€</span>
            {dayjs().isBefore(dayjs(beat.created_at).add(daysAgo, 'days')) && <Badge label='¡Nuevo!' className='bg-yellow-500 text-yellow-900 pill text-xs select-none' />}
          </div>
          <div className='w-full h-1/2 px-2 flex justify-start items-start'>
            <span className='font-inter text-white font-semibold cursor-pointer hover:underline truncate' onClick={() => navigate(`/beat/${beat.id}`)}>{beat?.name}</span>
          </div>

        </div> */}
      </div>
      {beat.id === reproductorData?.song?.id && 
      <div className='flex flex-col justify-start items-center gap-2'>
      <div className='flex justify-center items-start gap-4 h-[15px] text-zinc-900'>
        <Icon icon={"heroicons:arrow-up"} className='font-bold'/>
        <Icon icon={"heroicons:arrow-up"} className='font-bold'/>
        <Icon icon={"heroicons:arrow-up"} className='font-bold'/>
      </div>
      <div>
        <span className='font-inter text-zinc-950 font-regular cursor-pointer hover:underline truncate uppercase text-xs ' style={{letterSpacing:"0.2em"}} onClick={handleClickInfo}>info</span>
      </div>
      </div>
      }
      </div>
    )
  }
  if (size === 'small') {
    return (
      <div className={`h-16 w-full flex justify-start items-center gap-2 bg-zinc-200 rounded-lg cursor-pointer select-none border border-zinc-300 overflor-hidden p-2 ${shadowed ? 'shadow-xl text-base' : ''}`} onClick={() => navigate(`/beat/${beat.id}`)}>
        <div className='h-full shrink-0'>
          <img src={beat.cover_path} alt={`Cover del beat ${beat.name}`} className='h-full w-auto aspect-square' />
        </div>
        <div className='h-full flex flex-col justify-between items-start gap-1 py-1 overflow-hidden'>
          <span className='font-inter text-zinc-900 font-semibold truncate'>{beat?.name}</span>
          <div className='w-full flex justify-start items-center gap-2'>
            <div className='flex justify-center items-center gap-1'>
              <Icon icon='ic:baseline-speed' className='w-4 h-4 text-zinc-900' />
              <span className='font-inter text-zinc-900 text-xs font-semibold'>{beat.bpm} bpm</span>
            </div>
            {beat.scale &&
              <div className='flex justify-center items-center gap-1'>
                <Icon icon='ic:baseline-music-note' className='w-4 h-4 text-zinc-900' />
                <span className='font-inter text-zinc-900 text-xs font-semibold'>{beat.scale}</span>
              </div>}
          </div>
        </div>
      </div>

    )
  }
}

export default BeatCard
