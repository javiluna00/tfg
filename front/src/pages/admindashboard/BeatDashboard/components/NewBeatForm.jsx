import Textinput from '@/components/ui/Textinput'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import CustomSelector from './CustomSelector'
import useMoods from '@/hooks/useMoods'
import useGenres from '@/hooks/useGenres'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useBeats from '@/hooks/useBeats'
import ProgressBar from '@/components/ui/ProgressBar'
import Switch from '@/components/ui/Switch'

function NewBeatForm({AxiosPrivate}) {

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
        exclusive_price: yup.number("El precio debe ser un numero"),
        stock: yup.number("El stock debe ser un numero").required("Stock requerido"),
    })
    .required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver : yupResolver(schema)});
    


    const {moods, loadMoodsFromAPI} = useMoods({AxiosPrivate})
    const {genres, loadGenresFromAPI} = useGenres({AxiosPrivate})


    const {createBeat, uploadedProgress, loading} = useBeats({AxiosPrivate})

    const [exclusiveSwitch, setExclusiveSwitch] = useState(false)
    const [selectedMoods, setSelectedMoods] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [activeSwitch, setActiveSwitch] = useState(false)
    const [mp3File, setMp3File] = useState(null)
    const [wavFile, setWavFile] = useState(null)
    const [stemsFile, setStemsFile] = useState(null)
    const [coverFile, setCoverFile] = useState(null)
    const [taggedFile, setTaggedFile] = useState(null)

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


    const onSubmit = (data) => {
        const beat = {...data, moods: selectedMoods, genres: selectedGenres, exclusive: exclusiveSwitch, cover_file: coverFile, mp3_file: mp3File, wav_file: wavFile, stems_file: stemsFile, tagged_file: taggedFile, active: activeSwitch == true ? 1 : 0}
        createBeat(beat)
    }

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
                            <input type="file" className='w-full px-5 py-2.5 border border-slate-300 rounded-md' label="Portada" placeholder="Portada" name="cover_file" onChange={(e) => setCoverFile(e.target.files[0])}/>
                        </div>
                        <div className='w-1/2'>
                            <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Previsualización de la portada</span>
                            <img src={previewCover || "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="w-24 h-24" />
                        </div>
                    </div>
                    
                    <hr className='my-5' />

                    <h5 className='text-lg text-slate-900 font-medium mt-5 mb-2'>Instrumental con tag de voz</h5>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='w-1/2'>
                            <label htmlFor="tagged_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo MP3</label>
                            <input type="file" className='w-full px-5 py-2.5 border border-slate-300 rounded-md' label="Archivo MP3" placeholder="Archivo MP3" name="tagged_file" onChange={(e) => setTaggedFile(e.target.files[0])}/>
                        </div>
                    </div>             
                    
                    <h5 className='text-lg text-slate-900 font-medium mt-5 mb-2'>Licencia mp3</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <div className='w-1/2'>
                            <label htmlFor="mp3_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo MP3</label>
                            <input type="file" className='w-full px-5 py-2.5 border border-slate-300 rounded-md' label="Archivo MP3" placeholder="Archivo MP3" name="mp3_file" onChange={(e) => setMp3File(e.target.files[0])}/>
                        </div>
                        <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio mp3" name="mp3_price" register={register} error={errors.mp3_price} />
                    </div>

                    <h5 className='text-lg text-slate-900 font-medium mt-5 mb-2'>Licencia wav</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <div className='w-1/2'>
                            <label htmlFor="wav_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo WAV</label>
                            <input type="file" label="Archivo WAV" className='w-full px-5 py-2.5 border border-slate-300 rounded-md' placeholder="Archivo WAV" name="wav_file" onChange={(e) => setWavFile(e.target.files[0])}/>
                        </div>
                        <Textinput classGroup='w-1/2' label="Precio" type="number" placeholder="Precio wav" name="wav_price" register={register} error={errors.wav_price} />
                    </div>

                    <h5 className='text-lg text-slate-900 font-medium my-2'>Licencia stems</h5>
                    <div className='flex justify-center items-center gap-5'>
                        <div className='w-1/2'>
                            <label htmlFor="stems_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo STEMS</label>
                            <input type="file" label="Archivo STEMS" className='w-full px-5 py-2.5 border border-slate-300 rounded-md' placeholder="Archivo STEMS" name="stems_file" onChange={(e) => setStemsFile(e.target.files[0])}/>
                        </div>
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

                    <div className='mt-5'>    
                        <Switch
                        activeClass="bg-primary-500"
                        value={activeSwitch}
                        onChange={() => {setActiveSwitch(!activeSwitch);}}
                        label="Activo"
                        />
                    </div>

                    <Button disabled={loading} type='submit' text={loading ? "Guardando..." : "Guardar"} className='mt-5 bg-red-500 text-white'/>

                    {uploadedProgress > 0 && (
                        <div className="mt-5">
                            <ProgressBar value={uploadedProgress} />
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default NewBeatForm