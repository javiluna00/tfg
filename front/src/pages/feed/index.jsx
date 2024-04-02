import React, { useEffect, useState } from 'react'

import Beats from './Beats';
import { useOutletContext } from "react-router-dom";
import SectionPresentation from './components/SectionPresentation';
import SectionSocial from './components/SectionSocial';

function Feed() {

  const {setActiveBeat, setModalBeat} = useOutletContext();


  useEffect(() => {
    console.log("setActiveBeat", setActiveBeat)
    console.log("setModalBeat", setModalBeat)
  }, [setActiveBeat, setModalBeat])
  return (
    <div className='bg-[#000000] h-full'>

            <SectionPresentation/>
            <SectionSocial/>
            <Beats setActiveBeat={setActiveBeat} setModalBeat={setModalBeat}/>

    </div>

  )
}

export default Feed