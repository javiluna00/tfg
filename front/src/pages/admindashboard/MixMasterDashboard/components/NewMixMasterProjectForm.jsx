import Button from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';
import Textinput from '@/components/ui/Textinput';
import useMixMaster from '@/hooks/useMixMaster';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


function NewMixMasterProjectForm({AxiosPrivate}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createMixMasterProject} = useMixMaster({AxiosPrivate})
    const [unmixedFile, setUnmixedFile] = useState(null)
    const [mixedFile, setMixedFile] = useState(null)
    const [active, setActive] = useState(1)


    useEffect(() => {
        console.log(unmixedFile, mixedFile)
    }, [unmixedFile, mixedFile])

    const onSubmit = (data) => {
        if (!unmixedFile || !mixedFile) {
            toast.error("Por favor, selecciona un archivo de audio para el proyecto.");
            return;
        }
        const formData = new FormData();
        // Agregar los datos del formulario al objeto FormData
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        // Agregar el archivo de la imagen de portada
        formData.append('mixed_file', unmixedFile);
        formData.append('unmixed_file', mixedFile);
        formData.append('active', active);

        createMixMasterProject(formData).then((res) => {
            reset()
        }).catch((err) => {
            console.log(err)
        })

    }

    return (

    <div className='w-full'>
        <div className=" mx-auto flex w-max flex-col justify-center bg-white items-center gap-4 p-8 rounded-lg shadow-md">
            
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
                <h2 className='text-3xl text-slate-900 font-bold mb-5'>Subir nuevo proyecto</h2>
                <Textinput label="Nombre" placeholder="Nombre del proyecto" name="name" register={register} />
                <Textinput label="Descripción" placeholder="Descripción" name="description" register={register} />
                
                <div className="mt-5">
                    <Switch className="mt-5" label="Activo" name="active" value={active} onChange={() => setActive(active == 1 ? 0 : 1)}/>
                </div>
                

                <div className='w-full flex justify-start items-start gap-5 mt-5'> 
                    <div className='w-full'>
                        <label htmlFor="unmixed_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Sin mezclar</label>
                        <input type="file" label="Sin mezclar" placeholder="Sin mezclar" name="unmixed_file" onChange={(e) => setUnmixedFile(e.target.files[0])}/>
                    </div>
                </div>

                <div className='w-full flex justify-start items-start gap-5 mt-5'> 
                    <div className='w-full'>
                        <label htmlFor="mixed_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Mezclado</label>
                        <input type="file" label="Mezclado" placeholder="Mezclado" name="mixed_file" onChange={(e) => setMixedFile(e.target.files[0])}/>
                    </div>
                </div>

                <Button type="submit">Crear</Button>
            </form>
        </div>
    </div>
  
  )

}

export default NewMixMasterProjectForm