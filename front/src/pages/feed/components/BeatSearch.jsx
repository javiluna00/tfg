import { Icon } from '@iconify/react'
import React, { useState } from 'react'

function BeatSearch({filter, setBeatData}) {

  const [search, setSearch] = useState("")
  
  return (
    <div className='flex justify-center items-center gap-3 '>
        <input type="text" placeholder='Buscar...' className='appearance-none remove-buttons block w-60 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className='flex justify-center items-center bg-white rounded-full w-8 h-8 cursor-pointer hover:bg-red-600 hover:text-white transition duration-300'><Icon icon="material-symbols:search" className='rounded-full w-4 h-4' onClick={(e) => setBeatData({...filter, name: search})}/></div>
    </div>
  )
}

export default BeatSearch