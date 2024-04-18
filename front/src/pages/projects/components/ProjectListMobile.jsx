import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

function ProjectListMobile ({ activeProjects }) {
  const fadedColors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635']

  return (
    <section className='flex md:flex-row flex-col'>
      {activeProjects.map((project, index) => (
        <div className='w-full flex flex-col items-center justify-center p-10' style={{ backgroundImage: `linear-gradient(180deg, ${fadedColors[index % fadedColors.length]} 0%, ${fadedColors[(index + 1) % fadedColors.length]} 100%)` }} key={project.id}>

          <div className='w-full flex flex-col justify-start items-start'>

            <h5 className='font-bold text-3xl text-white tracking-widest uppercase'>{project.name}</h5>
            <p className='text-white mt-4 text-lg'>{project.description}</p>

            <div className='w-full flex justify-center items-center gap-5 mt-10 h-24'>

              {project.yt_link && <Link to={project.yt_link} target='_blank' className='flex justify-center items-center h-full'><Icon icon='ant-design:youtube-filled' fontSize={70} className='text-white hover:text-red-500 cursor-pointer duration-300' /></Link>}

              {project.spotify_link && <Link to={project.spotify_link} target='_blank' className='flex justify-center items-center h-full'><Icon icon='mdi:spotify' fontSize={70} className='text-white hover:text-red-500 cursor-pointer duration-300' /></Link>}

            </div>
            <img className='w-full h-full object-cover' src={project.image} alt={`Imagen del proyecto ${project.name}`} />

          </div>

        </div>
      ))}

    </section>
  )
}

export default ProjectListMobile
