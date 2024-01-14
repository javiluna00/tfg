import React from 'react'
import fondo from "@/assets/images/fondo.jpg"
import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import useContacto from '@/hooks/useContacto'
import { toast } from "react-toastify";

function Contacto() {

  const { contactoData, setContactoData, sendForm, clearForm} = useContacto()

  const handleSubmit = async(event) => {
    event.preventDefault()
    await sendForm()

  }

  return (
    <div className='min-h-screen' style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='container py-20'>
        <div className='flex flex-col justify-center items-center bg-white p-10 rounded-lg w-2/5 mx-auto' id='contact'>
          <form>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-md mb-2 text-slate-900'>Nombre</label>
              <input type="text" name="name" id="name" value={contactoData.nombre} className='border border-gray-300 py-3 px-6 w-96 rounded-md outline-none focus:border-red-400 focus:shadow-md' placeholder='Ingresa tu nombre...' onChange={(e) => setContactoData({...contactoData, nombre: e.target.value})}/>
              <div className='separator my-4'></div>
              <label htmlFor="email" className='text-md mb-2 text-slate-900'>E-mail</label>
              <input type="email" name="email" id="email" value={contactoData.email} className='border border-gray-300 py-3 px-6 rounded-md outline-none focus:border-red-400 focus:shadow-md' placeholder='Ingresa tu email...' onChange={(e) => setContactoData({...contactoData, email: e.target.value})}/>
              <div className='separator my-4'></div>
              <label htmlFor="asunto" className='text-md mb-2 text-slate-900'>Asunto</label>
              <input type="text" name="asunto" id="asunto" value={contactoData.asunto} className='border border-gray-300 py-3 px-6 rounded-md outline-none focus:border-red-400 focus:shadow-md' placeholder='Asunto...' onChange={(e) => setContactoData({...contactoData, asunto: e.target.value})}/>
              <div className='separator my-4'></div>
              <label htmlFor="mensaje" className='text-md mb-2 text-slate-900'>Mensaje</label>
              <textarea
                rows="4"
                name="mensaje"
                id="mensaje"
                placeholder="Escribe tu mensaje"
                value={contactoData.mensaje}
                class="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-400 focus:shadow-md"
                onChange={(e) => setContactoData({...contactoData, mensaje: e.target.value})}
              ></textarea>
              <div className='separator my-4'></div>

              <Button type="submit" className='w-96 bg-red-500 text-white' onClick={handleSubmit}>Enviar</Button>

            </div>

            
          </form>
          <div className='socialmedia flex flex-col'>
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-64 h-px my-8 bg-red-500 border-0 dark:bg-gray-700"/>
                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">o</span>
            </div>
            <div className='flex justify-center items-center mb-6'>
              <Icon icon="material-symbols-light:mail" className="text-xl text-slate-900" />
              <p className='text-slate-900 ml-2 text-sm'>lambdabeats2017@gmail.com</p>
            </div>
            <div className='flex justify-center items-center gap-6'>
                
                <a href="https://open.spotify.com/intl-es/artist/72kQGFiZ6YbY4gsjkFUMsP?si=468d5fc29c6e4263" target='_blank'><Icon icon="mdi:spotify" className="text-3xl text-slate-900 hover:text-red-500 duration-300 cursor-pointer" /></a>
                <a href="https://www.instagram.com/lambdabeats" target='_blank'><Icon icon="mdi:instagram" className="text-3xl text-slate-900 hover:text-red-500 duration-300 cursor-pointer" /></a>
                <a href="https://www.youtube.com/@lambdabeats" target='_blank'><Icon icon="mdi:youtube" className="text-3xl text-slate-900 hover:text-red-500 duration-300 cursor-pointer" /></a>

            </div>
          </div>
        </div>
        <div className='separator h-[100px]'></div>
      </div>
    </div>
  )
}

export default Contacto