import React from 'react'
import { useForm } from 'react-hook-form'
import NewProjectForm from './components/NewProjectForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'


function NewProject() {


    return (
        <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <NewProjectForm />
        </div>
    </div>
  )
}

export default NewProject