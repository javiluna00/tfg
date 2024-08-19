import React from 'react'
import BeatFilterItem from './BeatFilterItem'
import { Icon } from '@iconify/react'
import BeatSearch from './BeatSearch'

function BeatFilter ({ filter, setFilter, moods, genres }) {
  const filters = [
    { name: 'BPM', label: 'BPM' },
    { name: 'Precio', label: 'Precio' },
    { name: 'Mood', label: 'Mood' },
    { name: 'Género', label: 'Género' }
  ]

  const handleGenreClick = (genre) => {
    if (!filter.genres.includes(genre.name)) {
      setFilter({ ...filter, genres: [...filter.genres, genre.name] })
    } else {
      setFilter({ ...filter, genres: filter.genres.filter(g => g !== genre.name) })
    }
  }

  const handleMoodClick = (mood) => {
    if (!filter.moods.includes(mood.name)) {
      setFilter({ ...filter, moods: [...filter.moods, mood.name] })
    } else {
      setFilter({ ...filter, moods: filter.moods.filter(m => m !== mood.name) })
    }
  }

  const handleClearAllGenres = () => {
    setFilter({ ...filter, genres: [] })
  }
  const handleClearAllMoods = () => {
    setFilter({ ...filter, moods: [] })
  }

  const activeGenres = () => {
    if (filter.genres.length === 0) {
      return 'Todos'
    }
    const texto = filter.genres.map((genre) => genre)
    return texto.join(', ')
  }
  const activeMoods = () => {
    if (filter.moods.length === 0) {
      return 'Todos'
    }
    const texto = filter.moods.map((mood) => mood)
    return texto.join(', ')
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
            <span className='font-inter text-white font-semibold text-xs'>{activeMoods()}</span>
            {filter.moods.length > 0 ? <Icon icon='heroicons-outline:x' className='cursor-pointer' onClick={handleClearAllMoods} /> : null}
          </div>
        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>

          {moods.map((mood, index) => (

            <span key={mood.id} className={`font-inter ${filter.moods.includes(mood.name) ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleMoodClick(mood)}>{mood.name}</span>

          ))}
        </div>
      </div>
    ),
    Género: () => (
      <div className='py-6 px-3'>
        <div className='px-3'>
          <div className='flex items-center gap-3'>
            <span className='font-inter text-white font-semibold text-xs'>{activeGenres()}</span>
            {filter.genres.length > 0 ? <Icon icon='heroicons-outline:x' className='cursor-pointer' onClick={handleClearAllGenres} /> : null}
          </div>
        </div>
        <div className='grid grid-cols-4 p-8 grid-flow-row gap-4 text-center w-max'>

          {genres.map((genre, index) => (

            <span key={genre.id} className={`font-inter ${filter.genres.includes(genre.name) ? 'text-white' : 'text-zinc-400'} cursor-pointer`} onClick={() => handleGenreClick(genre)}>{genre.name}</span>

          ))}
        </div>
      </div>
    )

  }

  return (

    <>

      <div className='flex md:flex-row flex-col justify-center items-center gap-3 '>
        {filters.map((filter) => (
          <BeatFilterItem filter={filter} options={options[filter.name]} key={filter.name} />
        ))}
        <BeatSearch filter={filter} setFilter={setFilter} />
      </div>

    </>
  )
}

export default BeatFilter
