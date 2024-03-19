import React from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ShowProjectForm from './components/ShowProjectForm'


function ShowProject() {


    return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <ShowProjectForm editable={false} />
        </div>
    </div>
  )
}

export default ShowProject