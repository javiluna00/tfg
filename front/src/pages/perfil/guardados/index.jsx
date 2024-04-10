import React, { useEffect } from 'react'
import ReactTable from '@/components/partials/reacttable/ReactTable'
import SkeletionTable from '@/components/skeleton/Table'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import { useOutletContext } from 'react-router-dom'
import Beats from '@/pages/feed/Beats'
import useBeatFinder from '@/hooks/useBeatFinder'
import { useRecoilValue } from 'recoil'
import { beatState } from '@/store/beatStore'

function Saves () {
  const COLUMNS = [
    {
      header: 'Beat',
      accessorFn: (row) => row.beat_cover_path ? row.beat_cover_path : row.beat_name, // Esto asegura que el valor accesible sea el correcto.
      cell: ({ row }) => {
        // Aquí puedes acceder a los valores de la fila actual y renderizar contenido basado en ellos.
        const { beat_cover_path, beat_name } = row.original // Accede a las propiedades directamente desde row.original
        return (
          <div className='flex flex-col justify-center'>
            {/* Ejemplo de cómo podrías usar beat_cover_path y beat_name */}
            {beat_cover_path && (
              <img src={beat_cover_path} alt={beat_name} className='h-24 w-24' />
            )}

            <span className='text-lg font-bold mt-2'>{beat_name}</span>

          </div>
        )
      }
    },
    {
      header: 'Precio',
      accessorFn: ({ price }) => price,
      cell: (row) => {
        return <span>{parseFloat(row.getValue(), 10).toFixed(2)}€</span>
      }
    },
    {
      header: 'Fecha de compra',
      accessorFn: ({ bought_at }) => dayjs(bought_at).format('DD/MM/YYYY')
    },
    {
      header: 'Acciones',
      cell: (row) => {
        return (
          <div className='flex justify-start items-center gap-5'>
            <Button icon='heroicons-outline:download' text='Reproducir' onClick={(e) => window.open('http://localhost:8000/api/beatlicense/' + row.getValue() + '/download')} />
          </div>
        )
      }
    }
  ]

  const { auth, loading, AxiosPrivate } = useOutletContext()

  const { genres, moods, setGenres, setMoods } = useBeatFinder({ AxiosPrivate })
  const { filter, setFilter } = useRecoilValue(beatState)

  return (
    <div className='flex min-h-screen bg-zinc-700'>

      <div className='flex grow px-6 my-[30px] w-full'>
        {loading === true

          ? <SkeletionTable />

          : <Beats
              beatsPopularesRender={false}
              setModalBeat={false}
              setActiveBeat={false}
              setGenres={setGenres}
              setMoods={setMoods}
              genres={genres}
              loading={false}
              moods={moods}
              filter={filter}
              setFilter={setFilter}
              filteredBeats={auth?.user?.saves}
              beatsPopulares={[]}
              AxiosPrivate={auth?.AxiosPrivate}
            />}

      </div>
    </div>
  )
}

export default Saves
