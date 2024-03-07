import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Dropdown from '@/components/ui/Dropdown';
import useBeats from '@/hooks/useBeats';
import React from 'react'
import SkeletionTable from '@/components/skeleton/Table';
import { Menu } from '@headlessui/react';
import { Icon } from '@iconify/react';
import ReactTable from '@/components/partials/reacttable/ReactTable';
import dayjs from 'dayjs';



function BeatDashboard() {

  const actions = [
    {
        name: "Ver",
        icon: "heroicons-outline:eye",
    },
    {
        name: "Editar",
        icon: "heroicons:pencil-square",
    },
    {
        name: "Eliminar",
        icon: "heroicons-outline:trash",
    }
  ];

  const COLUMNS = [
    {
        header: 'ID',
        accessorKey: 'id',
        cell: (row) => {
            return <span>{row.getValue()}</span>;
        },
    },
    {
        header: 'Nombre',
        accessorKey: 'name',
        cell: (row) => {
            return <span className='font-bold'>{row.getValue()}</span>;
        }
    },
    {
        header: 'Cover',
        accessorKey: 'cover_path',
        cell: (row) => {
            return (
                <img src={row.getValue()} className="w-10 h-10" />
            )
        }
    },
    {
        header: 'Stock',
        accessorKey: 'stock',
    },
    {
        header: 'Exclusivo', 
        accessorFn : ({still_exclusive}) => still_exclusive ? 'Sí' : 'No',
    },

    {
        header: 'Fecha de subida',
        accessorFn: ({created_at}) => dayjs(created_at).format('DD-MM-YYYY HH:mm:ss'),
    },

    {
        header: "Acciones",
        cell: (row) => {
            return (
            <div className='flex justify-start items-center gap-5'>
                <Dropdown
                classMenuItems="right-0 w-[140px] top-[110%] "
                label={
                    <span className="block border border-red-500 rounded-full h-10 w-10 text-red-500 flex justify-center items-center">
                    <Icon icon="heroicons-outline:dots-vertical" />
                    </span>
                }
                >
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {actions.map((item, i) => (
                    <Menu.Item key={i}>
                        <div
                        className={`
                    
                        ${
                        item.name === "delete"
                            ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                            : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                        }
                        w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                        first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                        >
                        <span className="text-base">
                            <Icon icon={item.icon} />
                        </span>
                        <span>{item.name}</span>
                        </div>
                    </Menu.Item>
                    ))}
                </div>
                </Dropdown>
            </div>
            );
        },
        },
  ]

  const [beats] = useBeats()

  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>
        
        <div className='container'>
            
            <div>
              <Breadcrumbs/>
            </div>

            {!beats ? <SkeletionTable/> : 
            <div className='mt-10'>
              <ReactTable name={"Beats"} columns={COLUMNS} data={beats} hasNewButton={true} newEntityUrl={"/dashboard/beats/new"}/>
            </div>
            }
            
            

        </div>

    </div>
  )
}

export default BeatDashboard