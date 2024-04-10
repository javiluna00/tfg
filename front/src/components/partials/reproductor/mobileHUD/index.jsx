import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'

function MobileHUD ({
  reproductorData,
  hdlClickComprar,
  handleFavButton,
  handleLoopButton,
  handleMoveProgressBar,
  handleTooglePlayButton,
  progressBarRef,
  favved,
  porcentajePlayed,
  closeReproductor
}) {
  const [hoveringTrackTime, setHoveringTrackTime] = useState(false)

  return (
    <div className='h-24 w-full bg-[#000] flex justify-start items-start gap-2 bottom-0 fixed'>
      <div className='h-24 basis-9/12 flex flex-row justify-start items-center gap-5'>
        <img className='h-full object-cover aspect-square' src={reproductorData.song.cover_path} />
        <div className='ml-0 h-full py-3 flex flex-col justify-start items-start gap-2'>
          <Marquee><span className='text-white font-semibold text-sm select-none'>{reproductorData.song.name}</span></Marquee>
          <div className='mt-2 flex flex-row justify-center items-center gap-10'>
            <Button className='bg-red-500 text-white hover:bg-red-600 hover:border-white' onClick={hdlClickComprar}>
              <div className='flex flex-row justify-center items-center gap-2'>
                <Icon icon='ic:round-shopping-cart' />
                <span className='text-xs'>{reproductorData.song.licenses[0].pivot.price}€</span>
              </div>
            </Button>
            {favved === true
              ? <Icon icon='ic:baseline-favorite' className='h-6 w-6 text-red-500 cursor-pointer hover:text-red-600 transition duration-300' onClick={(e) => handleFavButton(e)} />
              : <Icon icon='ic:baseline-favorite-border' className='h-6 w-6 text-white cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleFavButton(e)} />}
          </div>

        </div>
      </div>
      <div className='h-24 basis-3/12'>
        <div className='flex flex-col h-full justify-center items-center'>
          {!reproductorData.isPlaying ? <Icon icon='ic:baseline-play-circle' className='text-white w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()} /> : <Icon icon='ic:baseline-pause-circle' className='text-white w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()} />}
        </div>
      </div>
      {/* <div className='-top-0.5 absolute left-0 h-0.5 bg-white' style={{width:{getPorcentagePlayed}}}>

            </div>
            <div className='absolute -top-1.5 h-3 w-3 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition duration-100' style={{left:{getPorcentagePlayed}}}>

            </div> */}
      <div className='absolute left-0 w-full h-[5px] cursor-pointer' onMouseEnter={(e) => setHoveringTrackTime(true)} onMouseLeave={(e) => setHoveringTrackTime(false)} ref={progressBarRef} onClick={handleMoveProgressBar}>
        <div className={`${hoveringTrackTime ? 'scale-y-110' : 'scale-y-100'} h-[2px] absolute top-0 bg-red-500 duration-300 transform`} style={{ width: `${porcentajePlayed}%`, transformOrigin: 'bottom' }} />
        {/* <input type="range" className='w-full h-px' defaultValue={reproductorData.currentDuration} min={0} max={reproductorData.duration} step="any"/> */}
      </div>
    </div>
  )
}

export default MobileHUD
