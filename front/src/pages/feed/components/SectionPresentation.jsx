import React from 'react'

import imagen from '@/assets/images/sections/lambda.png'


function SectionPresentation() {
  return (
    <div className='w-full h-[500px] flex justify-center items-center bg-[#000000] border-b border-red-500'>
        <img src={imagen} alt="" className='w-1/3' />
    </div>
  )
}

export default SectionPresentation