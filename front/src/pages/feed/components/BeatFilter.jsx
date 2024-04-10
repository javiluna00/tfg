

import React, {useEffect, useState} from 'react'
import BeatFilterItem from './BeatFilterItem'
import useFilter from '@/hooks/useFilter'
import useBeatFinder from '@/hooks/useBeatFinder'
import { initialFilterValues } from '@/constant/initialValues'
import BeatSearch from './BeatSearch'
import { useRecoilValue } from "recoil";
import { beatState } from "@/store/beatStore";
import { Icon } from '@iconify/react'
function BeatFilter({moods, genres, setGenres, setMoods, AxiosPrivate}) {

  const {filter, beatData, setBeatData} = useBeatFinder({AxiosPrivate});

  const filters = [
    { name: 'BPM', label: 'BPM' },
    { name: 'Mood', label: 'Mood' },
    { name: 'Género', label: 'Género' },
  ]

  const [anyGenreActive, setAnyGenreActive] = useState(false)
  const [anyMoodActive, setAnyMoodActive] = useState(false)

  const handleGenreClick = (index) => {
    setGenres((prevGenres) => {
      const updatedGenres = [...prevGenres];
      updatedGenres[index].active = !updatedGenres[index].active;
      return updatedGenres;
    });

    setBeatData({...beatData, filter: { ...beatData.filter, genres: genres.filter((genre) => genre.active).map((genre) => genre.name) } });
  };

  const handleMoodClick = (index) => {
    setMoods((prevMoods) => {
      const updatedMoods = [...prevMoods];
      updatedMoods[index].active = !updatedMoods[index].active;
      return updatedMoods;
    });

    setBeatData({...beatData, filter: { ...beatData.filter, genres: genres.filter((genre) => genre.active).map((genre) => genre.name) } });
  };

  const handleClearAllGenres = () => {
    setGenres((prevGeneros) => prevGeneros.map((genero) => ({ ...genero, active: false })));
  }
  const handleClearAllMoods = () => {
    setMoods((prevMoods) => prevMoods.map((mood) => ({ ...mood, active: false })));
  }

  useEffect(() => {
    setAnyGenreActive(genres.some((genre) => genre.active));
    setAnyMoodActive(moods.some((mood) => mood.active));
  }, [genres, moods]);
 
  const activeGenres = () => {
    const texto = genres.filter((genre) => genre.active).map((genre) => genre.name);
    return texto.join(", ");
  }
  const activeMoods = () => {
    const texto = moods.filter((mood) => mood.active).map((mood) => mood.name);
    return texto.join(", ");
  }

  const handleChangeNumber = (e, filterName) => {

    const value = e.target.value

    if(value == NaN || value == "" || value == null || value == undefined || value < 0) 
    {
      if(filterName == "bpm_from")
        setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_from: 0}}})
      if(filterName == "bpm_to")
        setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_to: 0}}})
      if(filterName == "price_from")
        setBeatData({...beatData, filter:{...beatData.filter, price:{...beatData.filter.price, price_from: 0}}})
      if(filterName == "price_to")
        setBeatData({...beatData, filter:{...beatData.filter, price:{...beatData.filter.price, price_to: 0}}})
    }
    else
    {
      if(filterName == "bpm_from")
        setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_from: e.target.value == NaN ? 0 : parseInt(e.target.value)}}})
      if(filterName == "bpm_to")
        setBeatData({...beatData, filter:{...beatData.filter, bpm:{...beatData.filter.bpm, bpm_to: e.target.value == NaN ? 0 : parseInt(e.target.value)}}})
      if(filterName == "price_from")
        setBeatData({...beatData, filter:{...beatData.filter, price:{...beatData.filter.price, price_from: e.target.value == NaN ? 0 : parseInt(e.target.value)}}})
      if(filterName == "price_to")
        setBeatData({...beatData, filter:{...beatData.filter, price:{...beatData.filter.price, price_to: e.target.value == NaN ? 0 : parseInt(e.target.value)}}})
    }
    
  }

  const options = {
    BPM : () => (
        
          <div className="py-6 px-3">
            <div className="flex items-center gap-3">
              <label className='font-inter text-white font-semibold text-xs '>Desde</label>
              <input 
                type="text"
                className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                
                value={filter.bpm.bpm_from == NaN ? 0 : filter.bpm.bpm_from}
                onChange={(e) => handleChangeNumber(e, 'bpm_from')}
              />
              <label className='font-inter text-white font-semibold text-xs'>hasta</label>
              <input 
                type="text" 
                className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                
                value={filter.bpm.bpm_to}
                onChange={(e) => handleChangeNumber(e, 'bpm_to')}
              />
            </div>
          </div>

    ),
    // Precio : () => (
    // <div className="py-6 px-3">
    //   <div className="flex items-center gap-3">
    //     <label className='font-inter text-white font-semibold text-xs '>Desde</label>
    //     <input 
    //       type="text"
    //       className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
    //       value={filter.price.price_from}
    //       onChange={(e) => handleChangeNumber(e, 'price_from')}
    //     />
    //     <label className='font-inter text-white font-semibold text-xs'>hasta</label>
    //     <input 
    //       type="text" 
    //       className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
    //       value={filter.price.price_to}
    //       onChange={(e) => handleChangeNumber(e, 'price_to')}
    //     />
    //   </div>
    // </div>
    // ),

    Mood: () => (
      <div className='py-6 px-3'>
        <div className='px-3'>
          <div className='flex items-center gap-3'>
            <span className='font-inter text-white font-semibold text-xs'>{anyMoodActive ? activeMoods() : "Todos"}</span>
            {anyMoodActive ? <Icon icon="heroicons-outline:x" className="cursor-pointer" onClick={handleClearAllMoods}/> : null}
          </div>
        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>
        
        {moods.map((mood, index) => (

            <span key={mood.id} className={`font-inter ${mood.active ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleMoodClick(index)}>{mood.label}</span>

        ))}
        </div>
      </div>
    ),
    Género: () => (
      <div className='py-6 px-3'>
        <div className='px-3'>
          <div className='flex items-center gap-3'>
            <span className='font-inter text-white font-semibold text-xs'>{anyGenreActive ? activeGenres() : "Todos"}</span>
            {anyGenreActive ? <Icon icon="heroicons-outline:x" className="cursor-pointer" onClick={handleClearAllGenres}/> : null}
          </div>
        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>
        
        {genres.map((genre, index) => (

            <span key={genre.id} className={`font-inter ${genre.active ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleGenreClick(index)}>{genre.label}</span>

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
        {/* <BeatSearch filter={filter} setBeatData={setBeatData}/> */}
    </div>

    

    </>
  )
}

export default BeatFilter