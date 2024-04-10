import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useDarkMode from '@/hooks/useDarkMode'

// image import

import LogoWhite from '@/assets/images/logo/logo-white.svg'
import Logo from '@/assets/images/logo/logo.svg'
import Illustration from '@/assets/images/login/lambda login.png'
import LoginForm from './components/login-form'
import Social from './components/social'
import Textinput from '@/components/ui/Textinput'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'

const Login = () => {
  const [isDark] = useDarkMode()
  const navigate = useNavigate()
  // const {isAuthenticated, endGoogleLogin} = useAuthBien()

  const { isAuthenticated, googleLogin, endGoogleLogin, logIn, isLoading } = useOutletContext()

  const [artistNameSection, setArtistNameSection] = useState(false)
  const [withArtistName, setWithArtistName] = useState(true)

  const [tempGoogleInfo, setTempGoogleInfo] = useState({})
  const [tempAccessToken, setTempAccessToken] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [isAuthenticated(), navigate])

  const schema = yup
    .object({
      artist_name: yup.string()
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all'
  })

  const onSubmitArtistName = (data) => {
    try {
      let artistName

      if (!withArtistName) {
        artistName = null
      } else {
        artistName = data.artist_name
      }
      endGoogleLogin(tempAccessToken, tempGoogleInfo, artistName)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const setActiveArtistNameSection = (resGoogle, accessToken) => {
    setArtistNameSection(true)

    const { id, ...resGoogleWithoutId } = resGoogle.data

    const resGoogleFormatted = {
      ...resGoogleWithoutId,
      googleId: id
    }

    setTempGoogleInfo(resGoogleFormatted)
    setTempAccessToken(accessToken)
  }

  return (
    <div className='loginwrapper'>
      <div className='lg-inner-column'>
        <div className='left-column relative z-[1] bg-slate-800'>
          <div className='max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20'>
            <Link to='/'>
              <img src={isDark ? LogoWhite : Logo} alt='' className='mb-10' />
            </Link>
            <h4>
              Unlockkk your Project
              <span className='text-slate-800 dark:text-slate-400 font-bold'>
                performance
              </span>
            </h4>
          </div>
          <div className='absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]'>
            <img
              src={Illustration}
              alt=''
              className='h-full w-full object-contain'
            />
          </div>
        </div>
        <div className='right-column relative'>

          <div className='inner-content h-full flex flex-col bg-white dark:bg-slate-800'>´

            {artistNameSection === false
              ? <div className='auth-box h-full flex flex-col justify-center'>
                <div className='mobile-logo text-center mb-6 lg:hidden block'>
                  <Link to='/'>
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=''
                      className='mx-auto'
                    />
                  </Link>
                </div>
                <div className='text-center 2xl:mb-10 mb-4'>
                  <h4 className='font-medium'>Iniciar sesión</h4>
                  <div className='text-slate-500 text-base' />
                </div>
                <LoginForm logIn={logIn} isLoading={isLoading} isAuthenticated={isAuthenticated} />
                <div className='relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6'>
                  <div className='absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal'>
                    O continua con
                  </div>
                </div>
                <div className='max-w-[242px] mx-auto mt-8 w-full'>
                  <Social activeArtistName={setActiveArtistNameSection} googleLogin={googleLogin} />
                </div>
                <div className='md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm'>
                  ¿No tienes una cuenta?{' '}
                  <Link
                    to='/register'
                    className='text-slate-900 dark:text-white font-medium hover:underline'
                  >
                    Regístrate
                  </Link>
                </div>
                </div>
              : <div className='auth-box h-full flex flex-col justify-center'>
                <div className='mobile-logo text-center mb-6 lg:hidden block'>
                  <Link to='/'>
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=''
                      className='mx-auto'
                    />
                  </Link>
                </div>

                <div className='text-center 2xl:mb-10 mb-4'>
                  <h4 className='font-medium'>Completa tu registro</h4>
                  <div className='text-slate-500 text-base' />
                </div>

                <form onSubmit={handleSubmit(onSubmitArtistName)} className='space-y-4 '>
                  <Textinput
                    name='artist_name'
                    label='Nombre artístico'
                    type='text'
                    placeholder='Nombre artístico'
                    register={register}
                    error={errors.artist_name}
                    className='h-[48px]'
                  />
                  <div className='flex justify-between'>
                    <Button type='submit' text='Terminar sin nombre artístico' className='bg-transparent text-slate-500 block w-full text-center hover:text-slate-700 duration-300' onClick={() => setWithArtistName(false)} />
                    <Button
                      type='submit'
                      text='Enviar'
                      className='btn btn-dark block w-full text-center '
                    />

                  </div>
                </form>
                </div>}
            <div className='auth-footer text-center'>
              Copyright 2021, Dashcode All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
