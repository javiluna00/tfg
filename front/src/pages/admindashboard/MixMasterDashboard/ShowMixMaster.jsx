import React from 'react'
import ShowMixMasterProjectForm from './components/ShowMixMasterProjectForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useOutletContext } from 'react-router-dom'

function ShowMixMaster() {
  const { AxiosPrivate } = useOutletContext()

  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
      <div className='container'>
        <Breadcrumbs />
        <ShowMixMasterProjectForm editable={false} AxiosPrivate={AxiosPrivate} />
      </div>
    </div>
  )
}

export default ShowMixMaster