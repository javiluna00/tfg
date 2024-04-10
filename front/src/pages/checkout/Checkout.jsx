import Button from '@/components/ui/Button'
import { useCartActions } from '@/hooks/useCartActions'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Textinput from '@/components/ui/Textinput'

const Checkout = () => {
  const schema = yup
    .object({
      email: yup.string().email('Email incorrecto').required('Email requerido')
    })
    .required()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all'
  })

  const [email, setEmail] = useState('')
  const { isAuthenticated, auth, AxiosPrivate } = useOutletContext()

  const { removeItem, totalPrice, cart, pay, isEmpty } = useCartActions({ AxiosPrivate })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRemoveFromCart = (beatLicenseId) => {
    removeItem(beatLicenseId, isAuthenticated())
  }

  const onSubmit = (data) => {
    setLoading(true)
    const emailParam = isAuthenticated() ? auth?.user?.email : data.email
    pay(emailParam, isAuthenticated())
  }

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate('/login')
    } else {
      setLoading(true)
      pay(auth?.user?.email, isAuthenticated())
    }
  }
  return (
    <div className='container'>

      <div className='my-10'>
        <h3 className='text-3xl font-bold text-white'>Checkout</h3>
      </div>

      <div className='md:flex justify-start items-start gap-5'>
        <div className='w-full md:w-3/5 p-5 bg-zinc-800 rounded-lg mb-5 md:mb-0'>
          <div>
            <h5 className='text-xl text-white'>Mi carrito</h5>
            <div className='h-px w-full bg-white my-5' />
          </div>
          <div className='flex flex-col justify-start items-start gap-5'>
            {cart.length === 0
              ? (
                <div className='p-5 bg-zinc-700 rounded-lg w-full'>
                  <p className='text-white text-xl'>No hay nada en el carrito.</p>
                </div>
                )
              : cart.map((item) => (
                <div key={item.id} className='p-5 bg-zinc-700 rounded-lg w-full'>
                  <div key={item.id} className='flex justify-start items-center gap-5'>

                    <div className='w-16 h-16'>
                      <img src={item.beat.cover_path} alt={item.beat.name} className='w-full h-full object-cover rounded-lg' />
                    </div>

                    <div className='flex flex-col justify-center items-start gap-3'>
                      <h5 className='text-sm text-white font-bold'>{item.beat.name}</h5>
                      <p className='text-sm text-white'>Licencia: <span className='text-red-500 font-bold'>{item.license.name.split(' ')[1]}</span></p>
                    </div>

                    <div className='flex-1 basis-7/12 flex justify-end items-center gap-5'>
                      <p className='text-sm text-white font-semibold'>{item.price}€</p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className=' text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100 hover:bg-danger-500 hover:text-white dark:hover:bg-danger-500 dark:hover:text-white'
                      >
                        <Icon icon='heroicons:trash' />
                      </button>
                    </div>

                  </div>
                </div>

              ))}

          </div>

          <div className='mt-5 flex w-full'>
            <Button onClick={(e) => navigate('/')}>Volver</Button>
          </div>

        </div>

        <div className='w-full md:w-2/5 p-5 bg-zinc-800 rounded-lg mb-5 md:mb-0'>
          <div>
            <h5 className='text-xl text-white'>Resumen</h5>
            <div className='h-px w-full bg-white my-5' />

            <div className='flex flex-col justify-start items-start gap-3 p-5 bg-zinc-700 rounded-lg'>
              {cart.map((item) => (
                <div key={item.id}>
                  <div key={item.id} className='flex justify-between items-center w-full'>
                    <p className='text-white text-sm'>{item.beat.name} <span className='text-red-500 font-bold'>({item.license.name.split(' ')[1]})</span></p>
                    <p className='text-white text-sm'>{item.price}€</p>

                  </div>
                  <div className='h-px w-full bg-white' />
                </div>
              ))}
            </div>

            <div className='flex flex-col justify-start items-start gap-5 p-5 bg-zinc-700 rounded-lg mt-5'>
              <div className='flex justify-between items-center w-full'>
                <p className='text-zinc-400 text-sm'>Subtotal</p>
                <p className='text-zinc-400 text-sm'>{totalPrice}€</p>
              </div>

              <div className='flex justify-between items-center w-full'>
                <p className='text-white font-bold text-md'>Total</p>
                <p className='text-white font-bold text-md'>{totalPrice()}€</p>
              </div>
              {isAuthenticated()

                ? !isEmpty() &&
                  <Button onClick={handleCheckout} disabled={loading} className={`w-full bg-red-500 text-white flex items-center justify-center gap-3 ${loading ? 'cursor-not-allowed' : ''}`}><Icon icon='akar-icons:envelope' className='w-5 h-5' />{loading ? 'Procesando...' : 'Pagar'}</Button>

                : <div className='items-center my-5 gap-5 w-full'>

                  <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <Textinput name='email' type='text' className='border border-gray-300 py-3 px-6 w-full rounded-md outline-none focus:border-red-400 focus:shadow-md mt-2' register={register} placeholder='Email' error={errors.email} />
                    <Button type='submit' className='mt-5 w-full bg-red-500 text-white flex items-center justify-center gap-3'><Icon icon='akar-icons:envelope' className='w-5 h-5' />Pagar como invitado</Button>
                  </form>
                  <p className='w-full text-center mt-5 text-white'>ó</p>

                  <div className='flex justify-center items-center gap-5'>
                    <Link to='/login' className='w-full'>
                      <p className='w-full text-center mt-5 text-white cursor-pointer hover:underline'>Iniciar sesión</p>
                    </Link>

                    <Link to='/register' className='w-full'>
                      <p className='w-full text-center mt-5 text-white cursor-pointer hover:underline'>Registrarse</p>
                    </Link>
                  </div>

                </div>}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Checkout
