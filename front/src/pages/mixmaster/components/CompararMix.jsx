import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import React, { useEffect, useRef, useState } from 'react'

function CompararMix ({ cancion, title }) {
  const [mixxed, setMixxed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const refMixed = useRef()
  const refUnmixed = useRef()

  useEffect(() => {
    if (mixxed) {
      refMixed.current.volume = 1
      refUnmixed.current.volume = 0
    } else {
      refMixed.current.volume = 0
      refUnmixed.current.volume = 1
    }
  }, [mixxed])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      refUnmixed.current.pause()
      refMixed.current.pause()
    } else {
      refUnmixed.current.play()
      refMixed.current.play()
    }
  }

  return (

    <div className='flex justify-between items-center gap-10 mt-10 w-[70%] rounded-full m-auto h-24 shadow-xl bg-red-50'>
      <audio ref={refUnmixed} src='http://localhost:8000/storage/mixedcomparation/1-unmixed.mp3' />
      <audio ref={refMixed} src='http://localhost:8000/storage/mixedcomparation/1-mixed.mp3' />
      <div className='flex justify-center items-center cursor-pointer rounded-full w-24 h-24 bg-red-500 hover:scale-110 duration-300' onClick={handlePlayPause}>
        {isPlaying ? <Icon icon='ic:baseline-pause' className='text-white text-5xl' /> : <Icon icon='ic:baseline-play-arrow' className='text-white text-5xl' />}
      </div>
      <h3 className='text-3xl text-red-500 font-semibold'>{title}</h3>
      <div className={`${mixxed ? 'bg-red-500 text-white' : 'text-red-500'} flex justify-center items-center cursor-pointer rounded-full w-24 h-24 border-2 border-red-500 hover:border-none hover:scale-110 hover:bg-red-500 duration-300`} onClick={() => setMixxed(!mixxed)}><Button className='hover:text-white duration-300 text-xl'>Mix!</Button></div>
    </div>
  )
}

export default CompararMix
