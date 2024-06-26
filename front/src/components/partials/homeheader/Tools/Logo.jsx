import React from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import { Link } from 'react-router-dom'
import useWidth from '@/hooks/useWidth'
import logolambda from '@/assets/videos/home/logolambda.mp4'

const Logo = () => {
  return (
    <div>
      <Link to='/'>
        <video className='w-14 h-14 object-cover mix-blend-screen' loop autoPlay muted src={logolambda} />
      </Link>
    </div>
  )
}

export default Logo
