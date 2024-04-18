import React from 'react'
import CardAttribute from './CardAttribute'
import Title from '@/components/ui/Title'

function BeatInfo ({ beat }) {
  return (
    <div className='grow w-full md:w-1/4 md:basis-1/4 p-6 bg-zinc-900 rounded-lg flex flex-col justify-start items-center gap-4'>

      <Title title='Información' className='text-white text-xs font-bold uppercase tracking-widest text-center' />

      <h3 className='text-red-500 font-bold text-center text-sm uppercase'>{beat.name}</h3>

      <CardAttribute title='Escala' icon='ic:baseline-music-note' value={beat.scale} />

      <CardAttribute title='BPM' icon='ic:baseline-speed' value={beat.bpm} />

      <div className='flex flex-col justify-start items-center gap-4 w-full'>
        <Title title='Moods' className='text-white text-xs font-bold uppercase tracking-widest text-center w-full' />
        <div className='grid grid-cols-4 p-4 grid-flow-row text-center w-full bg-white rounded-lg'>
          {beat.moods.map((mood, index) => (
            <p key={index} className='text-zinc-900 font-semibold text-center text-xs uppercase'>{mood}</p>
          ))}
        </div>
      </div>

      <div className='flex flex-col justify-start items-center gap-4 w-full'>
        <Title title='Géneros' className='text-white text-xs font-bold uppercase tracking-widest text-center w-full' />
        <div className='grid grid-cols-4 p-4 grid-flow-row text-center w-full bg-white rounded-lg '>
          {beat.genres.map((genre, index) => (
            <p key={index} className='text-zinc-900 font-semibold text-center text-xs uppercase'>{genre}</p>
          ))}
        </div>
      </div>

    </div>
  )
}

export default BeatInfo
