import React from 'react'
import { useOutletContext } from 'react-router-dom'
import SavedBeatsList from './components/SavedBeatsList'

function Saves () {
  const { auth } = useOutletContext()

  return (
    <div className='flex min-h-screen bg-zinc-700'>

      <div className='w-full rounded-lg'>
        <SavedBeatsList beats={auth.user?.saves} />
      </div>
    </div>
  )
}

export default Saves
