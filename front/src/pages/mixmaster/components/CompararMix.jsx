import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import React from 'react'

function CompararMix({cancion}) {
  return (

    
    
    <div className='flex justify-between items-start gap-10 mt-10 w-[70%] rounded-full m-auto h-24 shadow-xl bg-red-50'>
        <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
        <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
        <div className='flex justify-center items-center cursor-pointer rounded-full w-24 h-24 bg-red-500 hover:scale-110 duration-300'><Icon icon="ic:baseline-play-arrow"  className='text-white text-5xl'/></div>
        <div className='flex justify-center items-center cursor-pointer rounded-full w-24 h-24 border-2 border-red-500 hover:border-none hover:scale-110 text-red-500 hover:bg-red-500 duration-300'><Button className='text-red-500 hover:text-white duration-300 text-xl'>Mix!</Button></div>
    </div>
  )
}

export default CompararMix