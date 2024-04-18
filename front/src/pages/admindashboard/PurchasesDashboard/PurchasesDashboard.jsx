import ReactTable from '@/components/partials/reacttable/ReactTable'
import SkeletionTable from '@/components/skeleton/Table'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import usePurchases from '@/hooks/usePurchases'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PurchasesDashboard () {
  const { purchases, isLoading, getPurchasesFromAPI } = usePurchases()

  //   const actions = [
  //     {
  //       name: 'Ver',
  //       icon: 'heroicons-outline:eye',
  //       link: '/dashboard/projects/show/'
  //     },
  //     {
  //       name: 'Editar',
  //       icon: 'heroicons:pencil-square',
  //       link: '/dashboard/projects/edit/'
  //     },
  //     {
  //       name: 'eliminar',
  //       icon: 'heroicons-outline:trash'
  //     }
  //   ]

  const navigate = useNavigate()

  const COLUMNS = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => {
        return <span>{row.getValue()}</span>
      }
    },
    {
      header: 'Beat',
      cell: ({ row }) => {
        return (
          <div className='flex justify-start items-center'>
            <img src={row.original.beat.cover_path} className='w-12 h-12 object-cover rounded-sm ' />
            <div className='flex flex-col justify-center ml-3 gap-1'>
              <span className='font-bold uppercase cursor-pointer hover:underline' onClick={() => navigate(`/dashboard/beats/show/${row.original.beat.id}`)}>{row.original.beat.name}</span>
              <span>{row.original.license.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      header: 'Email',

      cell: ({ row }) => {
        const userRegistered = !!row.original.user
        const handleEmailClick = () => {
          if (userRegistered) {
            navigate(`/dashboard/users/${row.original.user.id}`)
          }
        }

        return (
          <span className={`uppercase ${userRegistered && 'cursor-pointer hover:underline'}`} onClick={handleEmailClick}>{row.original.email}</span>
        )
      }
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      cell: (row) => {
        return <span>{row.getValue()}€</span>
      }
    },
    {
      header: 'Fecha de compra',
      accessorFn: ({ created_at: createdAt }) => dayjs(createdAt).format('DD-MM-YYYY HH:mm:ss')
    }
  ]

  useEffect(() => {
    getPurchasesFromAPI()
  }, [])

  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>

      <div className='container'>

        <div>
          <Breadcrumbs />
        </div>

        <div className='mt-10'>
          {isLoading && <SkeletionTable />}
          {!isLoading && <ReactTable name='Ventas' columns={COLUMNS} data={purchases} />}
        </div>

      </div>

    </div>
  )
}

export default PurchasesDashboard
