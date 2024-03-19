import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

function SectionSocial() {
  return (
    <div className='w-full bg-red-500 p-10 flex justify-center items-center gap-[50px] h-[100px]'>
        <Link to ="https://twitter.com/illosimishu" target="_blank"><Icon className='cursor-pointer' icon="mdi:twitter" color="white" width="30px" height="30px"/></Link>
        <Link to ="https://instagram.com/lambdabeats" target="_blank"><Icon className='cursor-pointer' icon="mdi:instagram" color="white" width="30px" height="30px"/></Link>
        <Link to ="https://open.spotify.com/intl-es/artist/72kQGFiZ6YbY4gsjkFUMsP?si=7d9771ed36684c0c" target="_blank"><Icon className='cursor-pointer' icon="mdi:spotify" color="white" width="30px" height="30px"/></Link>
    </div>
  )
}

export default SectionSocial