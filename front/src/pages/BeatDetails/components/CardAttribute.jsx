import Title from '@/components/ui/Title'
import React from 'react'

function CardAttribute ({ title, icon, value }) {
  return (
    <div className='w-full flex justify-start items-center rounded-lg'>
      <div className='basis-1/2 bg-zinc-900 p-4 rounded-l-lg'>
        <Title title={title} icon={icon} iconPosition='left' className='text-white font-semibold text-center uppercase text-xs' iconClassName='text-white' />
      </div>
      <div className='basis-1/2 bg-white p-4 rounded-r-lg'>
        <p className='text-slate-900 font-semibold text-center text-xs uppercase'>{value}</p>
      </div>
    </div>
  )
}

export default CardAttribute
