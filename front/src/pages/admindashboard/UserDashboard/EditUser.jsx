import React from 'react'
import ShowUserForm from './components/ShowUserForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

function EditUser() {
  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <ShowUserForm editable={true} />
        </div>
    </div>
  )
}

export default EditUser