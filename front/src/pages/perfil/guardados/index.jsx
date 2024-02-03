import React from 'react'
import GuardadosTabla from './components/GuardadosTabla'
function Guardados() {
  return (
    <div className='flex'>
        <div className='flex grow px-6 my-[30px] w-full'>
          <GuardadosTabla/>
        </div>
    </div>
  )
}

export default Guardados