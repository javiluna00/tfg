import ReactTable from '@/components/partials/reacttable/ReactTable'
import Button from '@/components/ui/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
function PurchasesTable ({ userPurchases }) {
  const navigate = useNavigate()

  const COLUMNS = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: 'Beat',
      cell: ({ row }) => {
        const { beat } = row.original

        return (
          <>
            <img src={beat.cover_url} className='w-10 h-10' />
            <span className='font-bold'>{beat.name}</span>
          </>
        )
      }
    },
    {
      header: 'Licencia',
      accessorKey: 'licenseName'
    },
    {
      header: 'Precio',
      accessorKey: 'price'
    },
    {
      header: 'Fecha de compra',
      accessorKey: 'updatedAt'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => {
        const { beatId } = row.original
        return (
          <div className='flex justify-start items-center gap-5'>
            <Button icon='fe:link-external' className='text-primary-500' iconClass='w-6 h-6  hover:scale-125 duration-150' onClick={(e) => navigate('/dashboard/beats/show/' + beatId)} />
          </div>
        )
      }
    }
  ]

  if (!userPurchases) {
    return
  }
  return (
    <ReactTable name='Compras' data={userPurchases} columns={COLUMNS} />
  )
}

export default PurchasesTable
