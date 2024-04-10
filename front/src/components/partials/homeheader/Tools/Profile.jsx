import React from 'react'
import Dropdown from '@/components/ui/Dropdown'
import Icon from '@/components/ui/Icon'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from '@/assets/images/all-img/user.png'
import { useRecoilValue } from 'recoil'
import { authAtom } from '@/store/authStoreBien'
import useAuthBien from '@/hooks/useAuthBien'

const profileLabel = ({ user }) => {
  if (!user) return null

  return (
    <div className='flex items-center'>
      <div className='flex-1 ltr:mr-[10px] rtl:ml-[10px]'>
        <div className='h-5 w-5 rounded-full flex items-center justify-center'>
          <Icon icon='heroicons:user' className='text-white w-full h-full' />
        </div>
      </div>
      <div className='flex-none text-slate-600 dark:text-white text-sm font-normal items-center flex overflow-hidden text-ellipsis whitespace-nowrap'>
        <span className='overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block text-white lg:block hidden'>
          {user?.email}
        </span>
        <span className='text-base inline-block ltr:ml-[10px] rtl:mr-[10px] '>
          <Icon icon='heroicons-outline:chevron-down' className='text-white' />
        </span>
      </div>
    </div>
  )
}

const Profile = ({ user }) => {
  const { logOut } = useAuthBien()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ProfileMenu = [
    {
      label: 'Perfil',
      icon: 'heroicons-outline:user',

      action: () => {
        navigate('/profile')
      }
    },

    {
      label: 'Compras',
      icon: 'heroicons-outline:credit-card',
      action: () => {
        navigate('/profile/purchases')
      }
    },
    {
      label: 'Guardados',
      icon: 'heroicons-outline:heart',
      action: () => {
        navigate('/profile/saves')
      }
    },
    {
      label: 'Cerrar sesión',
      icon: 'heroicons-outline:login',
      action: () => {
        logOut()
        navigate('/')
      }
    }

  ]

  return (
    <Dropdown label={profileLabel({ user })} classMenuItems='w-[180px] top-[58px]'>
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? 'bg-red-100 text-red-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50'
                  : 'text-slate-600 dark:text-slate-300'
              } block     ${
                item.hasDivider
                  ? 'border-t border-slate-100 dark:border-slate-700'
                  : ''
              }`}
            >
              <div className='block cursor-pointer px-4 py-2'>
                <div className='flex items-center'>
                  <span className='block text-xl ltr:mr-3 rtl:ml-3'>
                    <Icon icon={item.icon} />
                  </span>
                  <span className='block text-sm'>{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  )
}

export default Profile
