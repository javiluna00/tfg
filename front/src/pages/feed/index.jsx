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

          <div className='h-12 grid grid-cols-2 items-center justify-center shadow-sm shadow-white'>

            <div className={`h-full cursor-pointer flex space-x-2 items-center justify-center ${activeSection === "beats" ? "bg-white text-[#000000]" : "bg-[#000000] text-white"}`} onClick={() => handleSectionChange("beats")}>
              <span className=' font-inter font-semibold'>Beats</span>
            </div>
            <div className={`h-full cursor-pointer border-l-2 border-slate-200 flex space-x-2 items-center justify-center ${activeSection === "demos" ? "bg-white text-[#000000]" : "bg-[#000000] text-white"}`} onClick={() => handleSectionChange("demos")}>
              <span className=' font-inter font-semibold'>Demos</span>
            </div>
          </div>

          

            {activeSection === "beats" ? <Beats /> : <Demos />}   
  

      


        

      
    


    
    </div>
  )
}

export default Feed