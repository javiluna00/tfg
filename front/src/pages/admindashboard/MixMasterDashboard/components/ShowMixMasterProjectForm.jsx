import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useMixMaster from '@/hooks/useMixMaster'
import useProjects from '@/hooks/useProjects'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'


function ShowMixMasterProjectForm({ editable = false, AxiosPrivate }) {
    const { id } = useParams()
    const [mixMasterProject, setMixMasterProject] = useState({})
    const { getOneMixMasterProject } = useMixMaster({ AxiosPrivate })
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
  
    const mixedInputRef = useRef()
    const unmixedInputRef = useRef()

    const [mixedFile, setMixedFile] = useState(null)
    const [unmixedFile, setUnmixedFile] = useState(null)
  
  
    useEffect(() => {
        setLoading(true)
        getOneMixMasterProject(id).then((res) => {
        setMixMasterProject(res)

        reset(res)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    }, [])
  
    const onSubmit = (data) => {
      if (!editable) return
  
      console.log('imageInput : ', imageInput)
  
    //   if (imageInput == null || imagePath == originalImagePath) {
    //     delete data.image
    //   }
  
      const formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key, data[key]))
    //   if (imageInput && imagePath != originalImagePath) {
    //     formData.append('image', imageInputRef.current.files[0])
    //   }
  
    //   updateProject(id, formData)
    }
  
    const handleResetButton = () => {
      setImagePath(originalImagePath)
      imageInputRef.current.value = null
    }
  
    return (
  
      <div className='w-full'>
        <div className='w-[90%] mx-auto flex flex-col justify-center items-center'>
          {loading
            ? <SkeletionTable />
            : <div className='w-full flex flex-col justify-center items-center gap-5'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-3xl text-slate-900 font-bold mb-5'>{editable ? 'Editar' : 'Ver'} proyecto</h2>
                <div className='w-full flex justify-center items-center gap-5'>
  
  
                  <div className='w-full flex flex-col justify-start items-start gap-5 mt-5'>
                    <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre</span>
                    <input type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Nombre' placeholder='Nombre del proyecto' name='name' defaultValue={mixMasterProject.name} {...register('name')} />
                    <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Descripción</span>
                    <textarea type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Descripción' placeholder='Descripción' name='description' defaultValue={mixMasterProject.description} {...register('description')} />
                  </div>
                </div>
  
                {editable && <Button type='submit' text='Guardar' className='btn-primary w-full mt-5' />}
              </form>
  
              </div>}
        </div>
      </div>
  
    )
}

export default ShowMixMasterProjectForm