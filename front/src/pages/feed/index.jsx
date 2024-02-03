import React, { useState } from 'react'

import Beats from './Beats';
import Demos from './Demos';
import Reproductor from '@/components/partials/reproductor';

function Feed() {


  const [activeSection, setActiveSection] = useState("beats");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const scrollStyle = {
    transform: `translateX(-${activeSection === "beats" ? 0 : "100%"})`, // Mueve la sección activa a la vista
  };


  return (
    <div className='bg-[#000000] h-full pb-20'>
            <Beats/>

    </div>

  )
}

export default Feed