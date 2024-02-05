import React, { useEffect, useState } from 'react'

import Beats from './Beats';
import Demos from './Demos';
import Reproductor from '@/components/partials/reproductor';
import { useOutletContext } from "react-router-dom";

function Feed() {

  const {setActiveBeat, setModalBeat} = useOutletContext();


  useEffect(() => {
    console.log("setActiveBeat", setActiveBeat)
    console.log("setModalBeat", setModalBeat)
  }, [setActiveBeat, setModalBeat])
  return (
    <div className='bg-[#000000] h-full pb-20'>
            <Beats setActiveBeat={setActiveBeat} setModalBeat={setModalBeat}/>

    </div>

  )
}

export default Feed