import React from 'react'

function ErrorCheckout() {
  return (
    <div className='container py-10'>
      <div className='w-full bg-slate-50 p-5 rounded-lg shadow'>
        <h3 className='text-3xl font-bold text-zinc-800'>Ha habido un error</h3>
        <p className='text-xl text-zinc-800 mt-5'>Por favor, vuelva a intentarlo.</p>
      </div>
    </div>
  )
}

export default ErrorCheckout