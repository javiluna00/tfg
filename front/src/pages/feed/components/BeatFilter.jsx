import React, { useEffect, useState } from 'react'
import BeatFilterItem from './BeatFilterItem'
import { Icon } from '@iconify/react'

function BeatFilter ({ filter, setFilter, moods, genres, setSelectedMoods, setSelectedGenres }) {
  useEffect(() => {
    console.log('Filter : ', filter)
  }, [filter])
  const filters = [
    { name: 'BPM', label: 'BPM' },
    { name: 'Precio', label: 'Precio' }
    { name: 'Mood', label: 'Mood' },
    { name: 'Género', label: 'Género' }
  ]

  const [anyGenreActive, setAnyGenreActive] = useState(false)
  const [anyMoodActive, setAnyMoodActive] = useState(false)

  const handleGenreClick = (index) => {
    setSelectedGenres((prevGenres) => {

    })
  }

  const handleMoodClick = (index) => {
    setSelectedMoods((prevMoods) => {

    })
  }

  const handleClearAllGenres = () => {
    setSelectedGenres()
  }
  const handleClearAllMoods = () => {
    setSelectedMoods()
  }

  useEffect(() => {
    setAnyGenreActive()
    setAnyMoodActive()
  }, [setSelectedGenres, setSelectedMoods])

  const activeGenres = () => {
    const texto = genres.filter((genre) => genre.active).map((genre) => genre.name)
    return texto.join(', ')
  }
  const activeMoods = () => {
    const texto = moods.filter((mood) => mood.active).map((mood) => mood.name)
    return texto.join(', ')
  }

  const handleChangeNumber = (e, filterName) => {
    const value = e.target.value
    console.log('El tipo de dato es : ', typeof (value))
    console.log('El valor es : ', value)
    console.log('El valor convertido es : ', parseInt(value))
    // if (isNaN(value) || value < 0) {
    //   if (filterName === 'bpm_from') { setFilter({ ...filter, bpm_from: 0 }) }
    //   if (filterName === 'bpm_to') { setFilter({ ...filter, bpm_to: 999 }) }
    //   if (filterName === 'price_from') { setFilter({ ...filter, price_from: 0 }) }
    //   if (filterName === 'price_to') { setFilter({ ...filter, price_to: 1000 }) }
    // } else {
    //   if (filterName === 'bpm_from') { setFilter({ ...filter, bpm_from: parseInt(value) }) }
    //   if (filterName === 'bpm_to') { setFilter({ ...filter, bpm_to: parseInt(value) }) }
    //   if (filterName === 'price_from') { setFilter({ ...filter, price_from: parseInt(value) }) }
    //   if (filterName === 'price_to') { setFilter({ ...filter, price_to: parseInt(value) }) }
    // }
  }

  const options = {
    BPM: () => (

      <div className='py-6 px-3'>
        <div className='flex items-center gap-3'>
          <label className='font-inter text-white font-semibold text-xs '>Desde</label>
          <input
            type='text'
            className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            value={isNaN(filter.bpm.bpm_from) ? '' : filter.bpm.bpm_from}
            onChange={(e) => setFilter({ ...filter, bpm: { ...filter.bpm, bpm_from: isNaN(e.target.value) ? 0 : parseInt(e.target.value) } })}
            min='0'
            max='999'
          />
          <label className='font-inter text-white font-semibold text-xs'>hasta</label>
          <input
            type='text'
            className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            value={isNaN(filter.bpm.bpm_to) ? '' : filter.bpm.bpm_to}
            onChange={(e) => setFilter({ ...filter, bpm: { ...filter.bpm, bpm_to: isNaN(e.target.value) ? 999 : parseInt(e.target.value) } })}
            min='0'
            max='999'
          />
        </div>
      </div>

    ),
    Precio: () => (
      <div className='py-6 px-3'>
        <div className='flex items-center gap-3'>
          <label className='font-inter text-white font-semibold text-xs '>Desde</label>
          <input
            type='text'
            className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            value={isNaN(filter.price.price_from) ? '' : filter.price.price_from}
            onChange={(e) => setFilter({ ...filter, price: { ...filter.price, price_from: isNaN(e.target.value) ? 0 : parseInt(e.target.value) } })}
          />
          <label className='font-inter text-white font-semibold text-xs'>hasta</label>
          <input
            type='text'
            className='appearance-none remove-buttons block w-16 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            value={isNaN(filter.price.price_to) ? '' : filter.price.price_to}
            onChange={(e) => setFilter({ ...filter, price: { ...filter.price, price_to: isNaN(e.target.value) ? 1000 : parseInt(e.target.value) } })}
          />
        </div>
      </div>
    ),

    Mood: () => (
      <div className='py-6 px-3'>
        <div className='px-3'>
          <div className='flex items-center gap-3'>
            <span className='font-inter text-white font-semibold text-xs'>{anyMoodActive ? activeMoods() : 'Todos'}</span>
            {anyMoodActive ? <Icon icon='heroicons-outline:x' className='cursor-pointer' onClick={handleClearAllMoods} /> : null}
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
            <span className='font-inter text-white font-semibold text-xs'>{anyGenreActive ? activeGenres() : 'Todos'}</span>
            {anyGenreActive ? <Icon icon='heroicons-outline:x' className='cursor-pointer' onClick={handleClearAllGenres} /> : null}
          </div>
        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>

          {genres.map((genre, index) => (

            <span key={genre.id} className={`font-inter ${genre.active ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleGenreClick(index)}>{genre.label}</span>

          ))}
        </div>
      </div>
    )

  }

  return (

    <>

      <div className='flex justify-center items-center gap-3 '>
        {filters.map((filter) => (
          <BeatFilterItem filter={filter} options={options[filter.name]} key={filter.name} />
        ))}
        {/* <BeatSearch filter={filter} setBeatData={setBeatData}/> */}
      </div>

    </>
  )
}

export default BeatFilter
