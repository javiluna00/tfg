import React from 'react'
import NewMixMasterProjectForm from './components/NewMixMasterProjectForm'
import { useOutletContext } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/Breadcrumbs'


function NewMixMaster() {

    const {AxiosPrivate} = useOutletContext()
    
    return (
    <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <NewMixMasterProjectForm AxiosPrivate={AxiosPrivate}/>
        </div>
    </div>
  )
}

export default NewMixMaster