import React, { useEffect, useRef } from 'react'
import logolambda from '@/assets/videos/home/logolambda.mp4'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from '@iconify/react';
import Button from '@/components/ui/Button';
import useProjects from '@/hooks/useProjects';
import { Link, useNavigate } from 'react-router-dom';


function Projects() {

  gsap.registerPlugin(ScrollTrigger);

  const { activeProjects, getActiveProjects } = useProjects()
  const playerRef = useRef(null);

  useEffect(() => {
    getActiveProjects()
  }, [])

  const navigate = useNavigate()

  //GSAP 

  const contenedorlambda = useRef()
  const videolambda = useRef()
  const fotoRef = useRef()
  const fotosRef = useRef()
  const totalRef = useRef()

  

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: contenedorlambda.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers:false
      }
    })
    tl.from(videolambda.current, {
      opacity:0,
    })
    tl.to(videolambda.current, {
      opacity:1,
    }) // <-- automatically reverted
  
  }, { scope: contenedorlambda }); // <-- scope is for selector text (optional)

  useEffect(() => {
    gsap.set(".derecha-item", {
      clipPath: function(){ 
        return "inset(0px 0px 0px 0px)"
      }
    })

    const animation = gsap.to(".derecha-item:not(:last-child)", {
      clipPath: function() {return "inset(0px 0px 100% 0px)"},
      stagger: 0.5,
      ease: "none"
    })

    ScrollTrigger.create({
      animation: animation,
      trigger: ".total",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers:false
    })      

  
  }, [activeProjects])
    




  const handleVideoEnd = () => {
    const player = playerRef.current;


    if(player)
    {
      player.currentTime = 0.1;
      player.play()
    }

  };

  





  return (
    <>
    <div className='container'>
      <div className='flex justify-center items-center mt-10'>
        <h1 className=' text-white font-laira text-10xl tracking-widest ' >Lambda Beats</h1>
        
      </div>
      <div className='w-full h-[300px]'></div>
      <div className='h-[500px] flex justify-center items-center' ref={contenedorlambda}>
        
        <div className="video-container absolute w-96 h-96 m-auto" style={{background:'black'}} ref={videolambda}>
          <video className='w-full h-full object-cover mix-blend-screen'  autoPlay muted ref={playerRef} src={logolambda} onEnded={handleVideoEnd} />
        </div>

      </div>

      <div className='spacer h-[50vh]'>

      </div>
    </div>
    
      <div className='wrapper relative h-auto w-[100vw] z-1 py-20'>
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

                    <iframe  src={`https://open.spotify.com/embed${project.spotify_link.replace("https://open.spotify.com/intl-es", "")}?utm_source=generator`} width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    
                  </div>             
                } 

                
              </div>

                
            </div>
              ))}
          </div>
          
          </div>

          <div className='derecha w-[50%] h-auto  border-l border-red-500'>
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
      </div>

      
      <div className='container'>

        <div className='spacer h-[50vh]'></div>

      </div>

    </>
  )
}

export default Projects