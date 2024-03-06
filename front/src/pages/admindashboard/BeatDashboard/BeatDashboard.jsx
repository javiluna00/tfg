import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React from 'react'
import BeatsTable from './components/BeatsTable'

function BeatDashboard() {
  return (
    <div className='w-full h-full py-10 bg-slate-50'>
        
        <div className='container'>
            
            <div>
              <Breadcrumbs/>
            </div>

            <div className='mt-10'>
              {/* <BeatsTable/> */}
            </div>
            

        </div>

    </div>
  )
}

export default BeatDashboard