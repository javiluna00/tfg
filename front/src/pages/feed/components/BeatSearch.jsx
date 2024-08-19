import React from 'react'

function BeatSearch ({ filter, setFilter }) {
  return (
    <div className='flex justify-center items-center gap-3 w-full'>
      <input type='text' placeholder='Buscar...' className='appearance-none remove-buttons block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value ?? '' })} />
    </div>
  )
}

export default BeatSearch
