import Title from '@/components/ui/Title'
import BeatCard from '@/pages/feed/components/BeatCard'
import React from 'react'
function SuggestedBeats ({ randomBeats }) {
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full mt-4 p-4 bg-zinc-900 rounded-lg h-max'>
      <Title title='Otros beats' className='text-white text-xs font-bold uppercase tracking-widest text-center' />
      {randomBeats.map((randomBeat, index) => (
        <BeatCard key={index} beat={randomBeat} size='small' />
      ))}
    </div>
  )
}

export default SuggestedBeats
