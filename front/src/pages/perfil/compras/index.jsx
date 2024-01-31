import React from 'react'
import ComprasTabla from './components/ComprasTabla'



function Compras() {
  return (
    <div className='flex'>
        <div className='flex grow px-6 my-[30px]'>
          <ComprasTabla/>
        </div>
    </div>
  )
}

export default Compras