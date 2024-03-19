import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React from 'react'
import NewBeatForm from './components/NewBeatForm'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

function NewBeat() {
  return (
    <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <NewBeatForm />
        </div>
    </div>
  )
}

export default NewBeat