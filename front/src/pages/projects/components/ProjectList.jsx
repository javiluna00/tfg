import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'


function ProjectList({activeProjects, totalRef, fotosRef, fotoRef}) {


    return (
        <section className='total flex' ref={totalRef}>
          <div className='izq relative w-[50%] z-2'>
            <div className='textos m-auto w-[80%]'>
              {activeProjects.map((project) => (
              <div className='card w-full flex flex-col items-center justify-center h-[100vh]' key={project.id}>

                <div className='izquierda-bl flex-col justify-start items-start'>

                  <h5 className='font-bold text-7xl text-white tracking-widest uppercase'>{project.name}</h5>
                  <p className='text-white mt-4 text-lg'>{project.description}</p>

                  <Link to={project.yt_link} target='_blank'><Icon icon="ant-design:youtube-filled" fontSize={70} className='text-white mt-10 hover:text-red-500 cursor-pointer duration-300'/></Link>


                {project.spotify_link &&
                  <div className='w-96 flex justify-start items-center mt-10'>

                    <iframe  src={`https://open.spotify.com/embed${project.spotify_link.replace("https://open.spotify.com/intl-es", "")}?utm_source=generator`} width="100%" height="100%" loading="lazy"></iframe>
                    
                  </div>             
                } 

                
              </div>

                
            </div>
              ))}
          </div>
          
          </div>

          <div className='derecha w-[50%] h-auto  border-l border-red-400'>
            <div className='derecha-bl flex flex-col justify-center items-center sticky top-0 w-full h-[100vh]'>
              <div className='derecha-fotos aspect-square w-3/5 relative ' ref={fotosRef}>
               {activeProjects.map((project, index) => ( 
                <div key={project.id} className={`derecha-item shadow-2xl w-full h-full absolute rounded-2xl overflow-hidden`} style={{zIndex:activeProjects.length - index}} ref={fotoRef}>

                  <img className="w-full h-full object-cover" src={project.image} alt="" />

                </div>
               ))}
              </div>

            </div>

          </div>
        </section>
    )
}

export default ProjectList