import React from 'react'
import Icon from '@/components/ui/Icon'
import { Link } from 'react-router-dom'
import useAuthBien from '@/hooks/useAuthBien'

function CartItem ({
  item,
  handleRemoveFromCart
}) {
  const { isAuthenticated } = useAuthBien()

  return (
    <div className='flex space-x-4 rtl:space-x-reverse bg-white shadow-md p-4'>
      <div className='flex-none'>
        <div className='md:w-20 md:h-20 w-14 h-14 bg-slate-200  rounded'>
          <img
            src={item.beat.cover_path}
            alt=''
            className=' w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='flex-1  space-y-1 truncate'>
        <Link to={`/beat/${item.id}`}><div className=' md:text-base text-sm  truncate   font-normal  text-slate-900 dark:text-white cursor-pointer hover:underline'>
          {item.beat.name}
        </div>
        </Link>

        <div className=' text-sm text-slate-500 dark:text-slate-400 pb-2'>
          Price: <span className=' text-xs'>{item.price}€</span>
        </div>

        <div className=' text-sm text-slate-500 dark:text-slate-400'>
          Licencia: <span className='text-red-500'>{item.license.name.split(' ')[1]}</span>
        </div>

        <div className='flex items-center space-x-4 rtl:space-x-reverse'>
          <div className='flex-1 flex items-center space-x-4 rtl:space-x-reverse' />

        </div>
      </div>
      <div>
        <button
          onClick={() => handleRemoveFromCart(item.id, isAuthenticated())}
          className=' text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100 hover:bg-danger-500 hover:text-white dark:hover:bg-danger-500 dark:hover:text-white'
        >
          <Icon icon='heroicons:trash' />
        </button>
      </div>
    </div>
  )
}

export default CartItem
