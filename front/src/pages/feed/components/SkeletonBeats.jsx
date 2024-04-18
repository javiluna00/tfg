import React from 'react'

function SkeletonBeats () {
  return (
    <div className='w-full grid gap-y-20 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-3 justify-center items-center mt-10'>
      {Array(5).fill(0).map((beat, index) => (
        <div key={index} className='w-48 h-64 bg-zinc-500 rounded-lg animate-pulse' />
      ))}
    </div>
  )
}

export default SkeletonBeats
