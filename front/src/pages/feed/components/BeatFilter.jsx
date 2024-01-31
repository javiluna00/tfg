

import React, {useEffect, useState} from 'react'
import BeatFilterItem from './BeatFilterItem'
import useFilter from '@/hooks/useFilter'
import useBeatFinder from '@/hooks/useBeatFinder'
import { initialFilterValues } from '@/constant/initialValues'
import BeatSearch from './BeatSearch'
import { useRecoilValue } from "recoil";
import { beatState } from "@/store/beatStore";
function BeatFilter() {

  const {filter, beatData, setBeatData} = useBeatFinder(beatState);
  const filters = [
    { name: 'BPM', label: 'BPM' },
    { name: 'Mood', label: 'Mood' },
    { name: 'Género', label: 'Género' },
    // { name: 'Escala', label: 'Escala' },
    { name: 'Precio', label: 'Precio' },
    // { name: 'Favoritos', label: 'Favoritos' },
  ]

  const moods = [
    { name: 'Relajado', label: 'Relajado' },
    { name: 'Romantico', label: 'Romantico' },
    { name: 'Tranquilo', label: 'Tranquilo' },
    { name: 'Energetico', label: 'Energetico' },
    { name: 'Musical', label: 'Musical' },
    { name: 'Triste', label: 'Triste' },
    { name: 'Espacial', label: 'Espacial' },

  ]

  const [anyActive, setAnyActive] = useState(false)

  const [generos, setGeneros] = useState([
    { name: "Trap", label: "Trap", active : false },
    { name: "Rap", label: "Rap", active : false },
    { name: "Drill", label: "Drill", active : false },
    { name: "Detroit", label: "Detroit", active : false },
    { name: "Plugg", label: "Plugg", active : false },
    { name: "Newjazz", label: "Newjazz", active : false },
    { name: "Reggaeton", label: "Reggaeton", active : false },
    { name: "Cumbia", label: "Cumbia", active : false },
    { name: "Phonk", label: "Phonk", active : false },
    { name: "Lo-fi", label: "Lo-fi", active : false },
    { name: "Funk brasilero", label: "Funk brasilero", active : false },
  ])

  const handleGeneroClick = (index) => {
    setGeneros((prevGeneros) => {
      const updatedGeneros = [...prevGeneros];
      updatedGeneros[index].active = !updatedGeneros[index].active;
      return updatedGeneros;
    });
  };

  useEffect(() => {
    setAnyActive(generos.some((genero) => genero.active));
  }, [generos])
 
  const generosActivos = () => {
    const texto = generos.filter((genero) => genero.active).map((genero) => genero.name);
    return texto.join(", ");
  }

  const options = {
    BPM : () => (
        
          <div className="py-6 px-3">
            <div className="flex items-center gap-3">
              <label className='font-inter text-white font-semibold text-xs '>Desde</label>
              <input 
                type="text"
                className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                
                value={filter.bpm.bpm_from}
                onChange={(e) => setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_from: parseInt(e.target.value)}}})}
              />
              <label className='font-inter text-white font-semibold text-xs'>hasta</label>
              <input 
                type="text" 
                className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                
                value={filter.bpm.bpm_to}
                onChange={(e) => setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_to: parseInt(e.target.value)}}})}
              />
            </div>
          </div>

    ),
    Precio : () => (
    <div className="py-6 px-3">
      <div className="flex items-center gap-3">
        <label className='font-inter text-white font-semibold text-xs '>Desde</label>
        <input 
          type="text"
          className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={filter.precio.precio_from}
          onChange={(e) => setBeatData({...beatData, filter:{...beatData.filter,precio:{...beatData.filter.precio,precio_from: parseInt(e.target.value)}}})}
        />
        <label className='font-inter text-white font-semibold text-xs'>hasta</label>
        <input 
          type="text" 
          className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={filter.precio.precio_to}
          onChange={(e) => setBeatData({...beatData, filter:{...beatData.filter, precio:{...beatData.filter.precio , precio_to: parseInt(e.target.value)}}})}
        />
      </div>
    </div>
    ),

    Mood: () => (
      <div className='py-6 px-3 flex flex-col gap-1'>
        {moods.map((mood) => (
          <div className='flex items-center gap-3 p-3'>
            <input type="checkbox" id={mood.name} name={mood.name} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <span className='font-inter text-white'>{mood.label}</span>
          </div>
        ))}
      </div>
    ),
    Género: () => (
      <div className='py-6 px-3'>
        <div className='px-3'>
        
          <span className='font-inter text-white font-semibold text-xs'>{anyActive ? generosActivos() : "Todos"}</span>

        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>
        
        {generos.map((genero, index) => (

            <span className={`font-inter ${genero.active ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleGeneroClick(index)}>{genero.label}</span>

        ))}
        </div>
      </div>
    ),


  }

  return (

    
    <>



    <div className='flex justify-center items-center gap-3 '>
        {filters.map((filter) => (
          <BeatFilterItem filter={filter} options={options[filter.name]} key={filter.name}/>
        ))}
        <BeatSearch filter={filter} setBeatData={setBeatData}/>
    </div>

    

    </>
  )
}

export default BeatFilter