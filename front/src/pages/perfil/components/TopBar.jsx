import React from 'react'
import { Link } from 'react-router-dom'

function TopBar ({ user }) {
  return (
    <div className='profile-wrap px-[35px] pb-10 pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0  justify-between items-end relative z-[1]'>

      <div className='profile-box flex-none md:text-start text-center'>
        <div className='md:flex items-end md:space-x-6 rtl:space-x-reverse'>
          <div className='flex-none' />
          <div className='flex-1'>
            <div className='text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]'>
              {user?.name}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4 bg-white'>
        <div className='flex-1'>
          <div className='text-base text-slate-900 dark:text-slate-300 font-medium mb-1'>
            {Object.entries(user?.purchases).length}
          </div>
          <div className='text-sm text-slate-600 font-light dark:text-slate-300'>
            Beats <Link to='/profile/purchases'><span className='text-primary-500 font-bold cursor-pointer'>comprados</span></Link>
          </div>
        </div>

        <div className='flex-1'>
          <div className='text-base text-slate-900 dark:text-slate-300 font-medium mb-1'>
            {user?.saves?.length}
          </div>
          <div className='text-sm text-slate-600 font-light dark:text-slate-300'>
            Beats <Link to='/profile/saves'><span className='text-primary-500 font-bold cursor-pointer'>guardados</span></Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TopBar
