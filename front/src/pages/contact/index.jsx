import React, { useEffect, useState } from 'react'
import fondo from "@/assets/images/fondo.jpg"
import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import useContact from '@/hooks/useContact'
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom'

function Contact() {

  const {AxiosPrivate} = useOutletContext()

  const {sendForm, clearForm} = useContact({AxiosPrivate})
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [enviado, setEnviado] = useState(false)

  const schema = yup
  .object({
    email: yup.string().email("Email incorrecto").required("Email requerido"),
    name: yup.string().required("Nombre requerido"),
    subject: yup.string().required("Asunto requerido"),
    message: yup.string().required("Mensaje requerido"),
    artistic_name: yup.string(),
  })
  .required();

  useEffect(() => {
    const img = new Image();
    img.src = fondo;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  const onSubmit = async (data) => {

    console.log("llega?")

    try {

      

      const res = await sendForm(data)

      setEnviado(true)

      reset()
      
    } catch (error) {
      toast.error(error.message);

    }
  };

  
  if(!isImageLoaded) {
    return( <div className='min-h-screen'></div>)
  }
  else
  {
    return (
      <div className='min-h-screen' style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className='container py-20'>
          {enviado == false ?
          
          <div className='flex flex-col justify-center items-center bg-white p-10 rounded-lg lg:w-3/5 max-w-[700px] mx-auto' id='contact'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-start w-full h-full'>
                <div className='flex w-full justify-between items-center gap-4'>
                  <div className='w-1/2'>
                    <label htmlFor="name" className='text-md mb-4 text-slate-900'>Nombre</label>
                    <input type="text" name="name" id="name" {...register('name')} error={errors.name} className='border border-gray-300 py-3 px-6 w-full rounded-md outline-none focus:border-red-400 focus:shadow-md mt-2' placeholder='Ingresa tu nombre...'/>
                  </div>
                  <div className='w-1/2'>
                    <label htmlFor="artistic_name" className='text-md mb-2 text-slate-900'>Nombre artístico (opcional)</label>
                    <input type="text" name="artistic_name" id="artistic_name" {...register('artistic_name')} error={errors.artistic_name} className='border border-gray-300 py-3 px-6 w-full rounded-md outline-none focus:border-red-400 focus:shadow-md mt-2' placeholder='Nombre artístico...'/>
                  </div>
                </div>

                <div className='separator my-4'></div>

                <label htmlFor="email" className='text-md mb-2 text-slate-900'>E-mail</label>
                <input type="email" name="email" id="email" {...register('email')} error={errors.email} className='border border-gray-300 py-3 px-6 w-full rounded-md outline-none focus:border-red-400 focus:shadow-md' placeholder='Ingresa tu email...' />
                <div className='separator my-4'></div>
                <label htmlFor="subject" className='text-md mb-2 text-slate-900'>Asunto</label>
                <input type="text" name="subject" id="subject" {...register('subject')} error={errors.subject} className='border border-gray-300 py-3 px-6 w-full rounded-md outline-none focus:border-red-400 focus:shadow-md' placeholder='Asunto...'/>
                <div className='separator my-4'></div>
                <label htmlFor="message" className='text-md mb-2 text-slate-900'>Mensaje</label>
                <textarea
                  rows="4"
                  name="message"
                  id="message"
                  placeholder="Escribe tu mensaje"
                  {...register('message')}
                  error={errors.message}
                  className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 w-full text-base font-medium text-[#6B7280] outline-none focus:border-red-400 focus:shadow-md"
                ></textarea>
                <div className='separator my-4'></div>
  
                <Button className='w-96 bg-red-500 text-white w-full' type='submit' >Enviar</Button>
  
              </div>
  
              
            </form>
            <div className='socialmedia flex flex-col'>
              <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-px my-8 bg-red-500 border-0 dark:bg-gray-700"/>
                  <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">o</span>
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
                      

          :
          
            <div className='w-full'>
              <div className='p-10 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center'>
                <h4 className='text-red-500 text-3xl font-bold mb-4'>
                  ¡Gracias por contactar!
                </h4>

                <p className='text-slate-900 ml-2 text-lg'>
                  Su mensaje ha sido enviado correctamente. Pronto nos pondremos en contacto.
                </p>

                <Button className='w-96 bg-red-500 text-white mt-6' onClick={() => setEnviado(false)}><Icon icon="mdi:left" className="text-xl text-slate-900" />Volver</Button>
              </div>
            </div>

          }
          <div className='separator h-[100px]'></div>
        </div>
      </div>
    )
  }
  
}

export default Contact