import React, { useEffect } from 'react'
import ReactTable from '@/components/partials/reacttable/ReactTable'
import SkeletionTable from '@/components/skeleton/Table'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import ComprasServices from './services/ComprasServices'
import { useOutletContext } from 'react-router-dom'

function Compras () {
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
      accessorKey: 'download_key',
      cell: (row) => {
        return (
          <div className='flex justify-start items-center gap-5'>
            <Button icon='heroicons-outline:download' text='Descargar' onClick={(e) => window.open('http://localhost:8000/api/beatlicense/' + row.getValue() + '/download')} />
          </div>
        )
      }
    }
  ]

  const { AxiosPrivate } = useOutletContext()

  const { getPurchases, purchases, loading } = ComprasServices({ AxiosPrivate })

  useEffect(() => {
    getPurchases()
  }, [])

  return (
    <div className='flex min-h-screen bg-zinc-700'>

      <div className='flex grow w-full'>
        {loading == true ? <SkeletionTable /> : <ReactTable name='Historial de compras' columns={COLUMNS} data={purchases} />}
      </div>
    </div>
  )
}

export default Compras
