import Textinput from '@/components/ui/Textinput'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MoodsSelector from './CustomSelector'
import GenresSelector from './GenresSelector'
import Button from '@/components/ui/Button'
import CustomSelector from './CustomSelector'
import useMoods from '@/hooks/useMoods'
import useGenres from '@/hooks/useGenres'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


function NewBeatForm() {

    const schema = yup
    .object({
        name: yup.string("Nombre debe ser un string").required("Nombre requerido"),
        bpm: yup.number("BPM debe ser un numero").required("BPM requerido"),
        scale: yup.string("Escala debe ser un string"),
        // cover_file: yup.mixed().required("Portada requerida"),
        // mp3_file: yup.mixed().required("MP3 requerido"),
        mp3_price: yup.number("El precio debe ser un numero").required("Precio requerido"),
        // wav_file: yup.mixed(),
        wav_price: yup.number("El precio debe ser un numero").required("Precio requerido"),
        // stems_file: yup.mixed(),
        stems_price: yup.number("El precio debe ser un numero").required("Precio requerido"),
        exclusive_price: yup.number("El precio debe ser un numero").required("Precio requerido"),
        stock: yup.number("El stock debe ser un numero").required("Stock requerido"),
    })
    .required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver : yupResolver(schema)});
    
    const onSubmit = (data) => {
        console.log("hola?")
        console.log({data, moods: selectedMoods, genres: selectedGenres, still_exclusive: exclusiveSwitch})
    }

    const {moods, loadMoodsFromAPI} = useMoods()
    const {genres, loadGenresFromAPI} = useGenres()

    const [exclusiveSwitch, setExclusiveSwitch] = useState(false)
    const [selectedMoods, setSelectedMoods] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [coverFile, setCoverFile] = useState(null)
    const [previewCover, setPreviewCover] = useState(null)

    useEffect(() => {
        loadMoodsFromAPI()
        loadGenresFromAPI()
    }, [])

    useEffect(() => {
        if (!coverFile) {
            setPreviewCover(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(coverFile)
        setPreviewCover(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [coverFile])

    return (
        <div className='w-full'>
            
            <div className="w-[70%] mx-auto flex flex-col justify-center items-center">
                
                <form onSubmit={handleSubmit(onSubmit)} className='p-5 rounded-lg bg-white w-full'>
                    <h2 className='text-3xl text-slate-900 font-bold mb-5'>Subir nuevo beat</h2>
                    <Textinput label="Nombre" type="text" placeholder="Nombre" name="name" register={register} error={errors.name} />
                    <div className='flex justify-center items-center w-full gap-5 mt-5'>

                        <Textinput classGroup='w-1/2' label="BPM" type="number" placeholder="BPM" name="bpm" register={register} error={errors.bpm} />
                        <Textinput classGroup='w-1/2' label="Escala" type="text" placeholder="Escala" name="scale" register={register} error={errors.scale} />

                    </div>
                    <div className='w-full flex justify-start items-start gap-5 mt-5'> 
                        <div className='w-1/2'>
                            <label htmlFor="cover_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Portada</label>
                            <input type="file" label="Portada" placeholder="Portada" name="cover_file" onChange={(e) => setCoverFile(e.target.files[0])}/>
                        </div>
                        <div className='w-1/2'>
                            <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Previsualización de la portada</span>
                            <img src={previewCover || "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="w-24 h-24" />
                        </div>
                    </div>
                    
                    <hr className='my-5' />
                    
                    <h5 className='text-lg text-slate-900 font-medium mt-5 mb-2'>Licencia mp3</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <Textinput classGroup='w-1/2' label="Archivo" type="file" placeholder="Licencia mp3" name="mp3_file" register={register} error={errors.mp3_file} />
                        <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio mp3" name="mp3_price" register={register} error={errors.mp3_price} />
                    </div>

                    <h5 className='text-lg text-slate-900 font-medium mt-5 mb-2'>Licencia wav</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <Textinput classGroup='w-1/2' label="Archivo" type="file" placeholder="Licencia wav" name="wav_file" register={register} error={errors.wav_file} />
                        <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio wav" name="wav_price" register={register} error={errors.wav_price} />
                    </div>

                    <h5 className='text-lg text-slate-900 font-medium my-2'>Licencia stems</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <Textinput classGroup='w-1/2' label="Archivo" type="file" placeholder="Licencia stems" name="stems_file" register={register} error={errors.stems_file} />
                        <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio stems" name="stems_price" register={register} error={errors.stems_price} />
                    </div>

                    <div className='flex justify-start  items-center gap-5'>
                        <label className='text-lg text-slate-900 font-medium my-2'>Exclusivo</label>
                        <input type="checkbox" switch onChange={() => setExclusiveSwitch(!exclusiveSwitch)} label="Exclusivo" />
                    </div>

                    {exclusiveSwitch && (
                        <div className='flex justify-start items-center gap-5'>
                            <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio" name="exclusive_price" register={register} error={errors.exclusive_price} />
                        </div>
                    )}
                    <hr className='my-5'/> 
                    <Textinput classGroup='w-1/2' label="Número de copias" type="number" placeholder="Número de copias" name="stock" register={register} error={errors.stock} />

                    <div className='mt-5'>    
                        <CustomSelector name="Moods" values={moods} setSelected={setSelectedMoods} selected={selectedMoods}/>
                    </div>

                    <div className='mt-5'>    
                        <CustomSelector name="Géneros" values={genres} setSelected={setSelectedGenres} selected={selectedGenres}/>
                    </div>

                    <Button type='submit' text="Crear" className='mt-5 bg-red-500 text-white'/>

                </form>
            </div>
        </div>
    )
}

export default NewBeatForm