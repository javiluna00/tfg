import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import useWidth from '@/hooks/useWidth'
import React from 'react'
import { Link } from 'react-router-dom'

function MenuLateral () {
  const { width, breakpoints } = useWidth()

  return (
    <div
      className={`transition-all duration-150  ${width <= breakpoints.xl && 'w-full'}`}
    >
      <Card bodyClass='bg-white rounded-lg py-6 h-full' className={`${width <= breakpoints.xl && 'w-full'} `}>
        <div className='h-full px-6 flex flex-col sm:flex-row xl:flex-col justify-center items-center gap-5 '>
          <Link to='/profile' className='text-2xl font-bold w-full'><Button icon='heroicons-outline:home' text='Perfil' className='bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block ' /></Link>
          <Link to='/profile/purchases' className='text-2xl font-bold w-full'><Button icon='heroicons-outline:credit-card' text='Compras' className='bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block' /></Link>
          <Link to='/profile/saves' className='text-2xl font-bold w-full'><Button icon='heroicons-outline:heart' text='Guardados' className='bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block' /></Link>
        </div>
      </Card>
    </div>
  )
}

export default MenuLateral
