import React from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ShowProjectForm from './components/ShowProjectForm'


function EditProject() {


    return (
        <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <ShowProjectForm editable={true} />
        </div>
    </div>
  )
}

export default EditProject