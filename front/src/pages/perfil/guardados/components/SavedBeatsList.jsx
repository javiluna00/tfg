import Title from '@/components/ui/Title'
import BeatCard from '@/pages/feed/components/BeatCard'
import React from 'react'

function SavedBeatsList ({ beats }) {
  return (
    <div className='w-full min-h-[70vh] p-4 bg-white rounded-lg '>
      <Title title='Guardados' className='text-zinc-900 text-md w-full font-bold uppercase tracking-widest p-4' />
      {beats.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {beats.map((beat, index) => (
            // <div key={index} className='w-full bg-white rounded-lg flex justify-start items-center'>
            //   <img src={beat.cover_path} alt={beat.name} className='h-[100px] aspect-square object-cover' />
            //   <div className='w-full h-full p-4 flex flex-col justify-start items-start'>
            //     <h4 className='text-slate-900 font-semibold text-center text-xs'>{beat.name}</h4>
            //   </div>
            // </div>
            <BeatCard key={index} beat={beat} size='small' shadowed />
          ))}
        </div>)}
    </div>
  )
}

export default SavedBeatsList
